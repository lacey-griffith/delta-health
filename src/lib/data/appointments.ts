import db from "@/lib/db";
import type { Appointment, NextAction } from "@/types";

interface AppointmentRow {
  id: string;
  doctor_id: string;
  date: string;
  reason_for_visit: string;
  what_happened: string | null;
  status: Appointment["status"];
  rescheduled_from_id: string | null;
  linked_va_appointment_id: string | null;
}

interface NextActionRow {
  id: string;
  appointment_id: string;
  description: string;
  due_date: string | null;
  completed: number;
}

function rowToNextAction(row: NextActionRow): NextAction {
  return {
    id: row.id,
    description: row.description,
    dueDate: row.due_date ?? undefined,
    completed: row.completed === 1,
  };
}

function rowToAppointment(row: AppointmentRow, nextActionItems: NextAction[]): Appointment {
  return {
    id: row.id,
    doctorId: row.doctor_id,
    date: row.date,
    reasonForVisit: row.reason_for_visit,
    whatHappened: row.what_happened ?? undefined,
    nextActionItems,
    status: row.status,
    rescheduledFromId: row.rescheduled_from_id ?? undefined,
    linkedVaAppointmentId: row.linked_va_appointment_id ?? undefined,
  };
}

function getNextActionsForAppointment(appointmentId: string): NextAction[] {
  const rows = db
    .prepare("SELECT * FROM next_actions WHERE appointment_id = ? ORDER BY due_date IS NULL, due_date ASC")
    .all(appointmentId) as NextActionRow[];
  return rows.map(rowToNextAction);
}

export function getAppointments(): Appointment[] {
  const rows = db.prepare("SELECT * FROM appointments ORDER BY date DESC").all() as AppointmentRow[];
  const allActions = db.prepare("SELECT * FROM next_actions").all() as NextActionRow[];
  const actionsByAppointment = new Map<string, NextAction[]>();
  for (const row of allActions) {
    const list = actionsByAppointment.get(row.appointment_id) ?? [];
    list.push(rowToNextAction(row));
    actionsByAppointment.set(row.appointment_id, list);
  }
  return rows.map((row) => rowToAppointment(row, actionsByAppointment.get(row.id) ?? []));
}

export function getAppointment(id: string): Appointment | undefined {
  const row = db.prepare("SELECT * FROM appointments WHERE id = ?").get(id) as AppointmentRow | undefined;
  if (!row) return undefined;
  return rowToAppointment(row, getNextActionsForAppointment(id));
}

type AppointmentInput = Omit<Appointment, "id" | "nextActionItems">;

export function createAppointment(data: AppointmentInput): Appointment {
  const id = crypto.randomUUID();
  db.prepare(
    `INSERT INTO appointments (id, doctor_id, date, reason_for_visit, what_happened, status, rescheduled_from_id, linked_va_appointment_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    data.doctorId,
    data.date,
    data.reasonForVisit,
    data.whatHappened ?? null,
    data.status,
    data.rescheduledFromId ?? null,
    data.linkedVaAppointmentId ?? null
  );
  return { id, nextActionItems: [], ...data };
}

export function updateAppointment(
  id: string,
  data: Pick<AppointmentInput, "doctorId" | "date" | "reasonForVisit" | "whatHappened" | "status">
): void {
  db.prepare(
    `UPDATE appointments SET doctor_id = ?, date = ?, reason_for_visit = ?, what_happened = ?, status = ?
     WHERE id = ?`
  ).run(data.doctorId, data.date, data.reasonForVisit, data.whatHappened ?? null, data.status, id);
}

export function findRescheduledAppointment(originalId: string): Appointment | undefined {
  const row = db.prepare("SELECT * FROM appointments WHERE rescheduled_from_id = ?").get(originalId) as
    | AppointmentRow
    | undefined;
  if (!row) return undefined;
  return rowToAppointment(row, getNextActionsForAppointment(row.id));
}

export function rescheduleAppointment(originalId: string, newDate: string): Appointment {
  const original = getAppointment(originalId);
  if (!original) throw new Error("Original appointment not found.");

  const rescheduleTx = db.transaction(() => {
    db.prepare("UPDATE appointments SET status = 'rescheduled' WHERE id = ?").run(originalId);
    return createAppointment({
      doctorId: original.doctorId,
      date: newDate,
      reasonForVisit: original.reasonForVisit,
      status: "scheduled",
      rescheduledFromId: originalId,
    });
  });

  return rescheduleTx();
}
