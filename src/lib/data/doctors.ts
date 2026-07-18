import db from "@/lib/db";
import type { Doctor } from "@/types";

interface DoctorRow {
  id: string;
  name: string;
  specialty: string;
  facility: string;
  is_va: number;
  phone: string | null;
  email: string | null;
  address: string | null;
  notes: string | null;
}

function rowToDoctor(row: DoctorRow): Doctor {
  return {
    id: row.id,
    name: row.name,
    specialty: row.specialty,
    facility: row.facility,
    isVA: row.is_va === 1,
    phone: row.phone ?? undefined,
    email: row.email ?? undefined,
    address: row.address ?? undefined,
    notes: row.notes ?? undefined,
  };
}

export function getDoctors(): Doctor[] {
  const rows = db.prepare("SELECT * FROM doctors ORDER BY name ASC").all() as DoctorRow[];
  return rows.map(rowToDoctor);
}

export function getDoctor(id: string): Doctor | undefined {
  const row = db.prepare("SELECT * FROM doctors WHERE id = ?").get(id) as DoctorRow | undefined;
  return row ? rowToDoctor(row) : undefined;
}

export function createDoctor(doctor: Omit<Doctor, "id">): Doctor {
  const id = crypto.randomUUID();
  db.prepare(
    `INSERT INTO doctors (id, name, specialty, facility, is_va, phone, email, address, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    doctor.name,
    doctor.specialty,
    doctor.facility,
    doctor.isVA ? 1 : 0,
    doctor.phone ?? null,
    doctor.email ?? null,
    doctor.address ?? null,
    doctor.notes ?? null
  );
  return { id, ...doctor };
}

export function updateDoctor(id: string, doctor: Omit<Doctor, "id">): void {
  db.prepare(
    `UPDATE doctors SET name = ?, specialty = ?, facility = ?, is_va = ?, phone = ?, email = ?, address = ?, notes = ?
     WHERE id = ?`
  ).run(
    doctor.name,
    doctor.specialty,
    doctor.facility,
    doctor.isVA ? 1 : 0,
    doctor.phone ?? null,
    doctor.email ?? null,
    doctor.address ?? null,
    doctor.notes ?? null,
    id
  );
}

export function deleteDoctor(id: string): void {
  db.prepare("DELETE FROM doctors WHERE id = ?").run(id);
}

export function getDoctorReferenceCounts(id: string): { appointments: number; medications: number } {
  const appointments = (
    db.prepare("SELECT COUNT(*) as count FROM appointments WHERE doctor_id = ?").get(id) as {
      count: number;
    }
  ).count;
  const medications = (
    db.prepare("SELECT COUNT(*) as count FROM medications WHERE prescribing_doctor_id = ?").get(id) as {
      count: number;
    }
  ).count;
  return { appointments, medications };
}
