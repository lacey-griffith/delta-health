import db from "@/lib/db";
import type { NextAction } from "@/types";

export interface NextActionWithContext extends NextAction {
  appointmentId: string;
  doctorName: string;
  appointmentDate: string;
}

interface NextActionContextRow {
  id: string;
  appointment_id: string;
  description: string;
  due_date: string | null;
  completed: number;
  appointment_date: string;
  doctor_name: string;
}

export function addNextAction(appointmentId: string, description: string, dueDate?: string): NextAction {
  const id = crypto.randomUUID();
  db.prepare(
    `INSERT INTO next_actions (id, appointment_id, description, due_date, completed)
     VALUES (?, ?, ?, ?, 0)`
  ).run(id, appointmentId, description, dueDate ?? null);
  return { id, description, dueDate, completed: false };
}

export function toggleNextActionComplete(id: string): void {
  db.prepare("UPDATE next_actions SET completed = NOT completed WHERE id = ?").run(id);
}

export function getAllNextActionsWithContext(): NextActionWithContext[] {
  const rows = db
    .prepare(
      `SELECT
         na.id AS id,
         na.appointment_id AS appointment_id,
         na.description AS description,
         na.due_date AS due_date,
         na.completed AS completed,
         a.date AS appointment_date,
         d.name AS doctor_name
       FROM next_actions na
       JOIN appointments a ON a.id = na.appointment_id
       JOIN doctors d ON d.id = a.doctor_id
       ORDER BY na.due_date IS NULL, na.due_date ASC`
    )
    .all() as NextActionContextRow[];

  return rows.map((row) => ({
    id: row.id,
    description: row.description,
    dueDate: row.due_date ?? undefined,
    completed: row.completed === 1,
    appointmentId: row.appointment_id,
    doctorName: row.doctor_name,
    appointmentDate: row.appointment_date,
  }));
}
