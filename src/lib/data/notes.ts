import db from "@/lib/db";
import type { VisitNote } from "@/types";

interface VisitNoteRow {
  id: string;
  appointment_id: string;
  content: string;
  created_at: string;
}

function rowToVisitNote(row: VisitNoteRow): VisitNote {
  return {
    id: row.id,
    appointmentId: row.appointment_id,
    content: row.content,
    createdAt: row.created_at,
  };
}

export function getVisitNotes(): VisitNote[] {
  const rows = db.prepare("SELECT * FROM visit_notes ORDER BY created_at DESC").all() as VisitNoteRow[];
  return rows.map(rowToVisitNote);
}

export function getVisitNote(id: string): VisitNote | undefined {
  const row = db.prepare("SELECT * FROM visit_notes WHERE id = ?").get(id) as VisitNoteRow | undefined;
  return row ? rowToVisitNote(row) : undefined;
}

export function createVisitNote(data: Omit<VisitNote, "id" | "createdAt">): VisitNote {
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  db.prepare(
    `INSERT INTO visit_notes (id, appointment_id, content, created_at) VALUES (?, ?, ?, ?)`
  ).run(id, data.appointmentId, data.content, createdAt);
  return { id, createdAt, ...data };
}

export function updateVisitNote(id: string, content: string): void {
  db.prepare("UPDATE visit_notes SET content = ? WHERE id = ?").run(content, id);
}

export function deleteVisitNote(id: string): void {
  db.prepare("DELETE FROM visit_notes WHERE id = ?").run(id);
}
