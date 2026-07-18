import db from "@/lib/db";
import type { Medication } from "@/types";

interface MedicationRow {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescribing_doctor_id: string;
  start_date: string;
  end_date: string | null;
  active: number;
  notes: string | null;
}

function rowToMedication(row: MedicationRow): Medication {
  return {
    id: row.id,
    name: row.name,
    dosage: row.dosage,
    frequency: row.frequency,
    prescribingDoctorId: row.prescribing_doctor_id,
    startDate: row.start_date,
    endDate: row.end_date ?? undefined,
    active: row.active === 1,
    notes: row.notes ?? undefined,
  };
}

export function getMedications(): Medication[] {
  const rows = db
    .prepare("SELECT * FROM medications ORDER BY active DESC, name ASC")
    .all() as MedicationRow[];
  return rows.map(rowToMedication);
}

export function getMedication(id: string): Medication | undefined {
  const row = db.prepare("SELECT * FROM medications WHERE id = ?").get(id) as MedicationRow | undefined;
  return row ? rowToMedication(row) : undefined;
}

export function createMedication(data: Omit<Medication, "id">): Medication {
  const id = crypto.randomUUID();
  db.prepare(
    `INSERT INTO medications (id, name, dosage, frequency, prescribing_doctor_id, start_date, end_date, active, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    data.name,
    data.dosage,
    data.frequency,
    data.prescribingDoctorId,
    data.startDate,
    data.endDate ?? null,
    data.active ? 1 : 0,
    data.notes ?? null
  );
  return { id, ...data };
}

export function updateMedication(id: string, data: Omit<Medication, "id">): void {
  db.prepare(
    `UPDATE medications SET name = ?, dosage = ?, frequency = ?, prescribing_doctor_id = ?, start_date = ?, end_date = ?, active = ?, notes = ?
     WHERE id = ?`
  ).run(
    data.name,
    data.dosage,
    data.frequency,
    data.prescribingDoctorId,
    data.startDate,
    data.endDate ?? null,
    data.active ? 1 : 0,
    data.notes ?? null,
    id
  );
}

export function toggleMedicationActive(id: string): void {
  db.prepare("UPDATE medications SET active = NOT active WHERE id = ?").run(id);
}
