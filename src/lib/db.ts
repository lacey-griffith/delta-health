import Database from "better-sqlite3";
import path from "path";

declare global {
  var __deltaHealthDb: Database.Database | undefined;
}

function createDb() {
  const dbPath = path.join(process.cwd(), "delta-health.db");
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.pragma("busy_timeout = 5000");

  db.exec(`
    CREATE TABLE IF NOT EXISTS doctors (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      specialty TEXT NOT NULL,
      facility TEXT NOT NULL,
      is_va INTEGER NOT NULL,
      phone TEXT,
      email TEXT,
      address TEXT,
      notes TEXT
    );

    CREATE TABLE IF NOT EXISTS appointments (
      id TEXT PRIMARY KEY,
      doctor_id TEXT NOT NULL REFERENCES doctors(id),
      date TEXT NOT NULL,
      reason_for_visit TEXT NOT NULL,
      what_happened TEXT,
      status TEXT NOT NULL,
      rescheduled_from_id TEXT REFERENCES appointments(id),
      linked_va_appointment_id TEXT
    );

    CREATE TABLE IF NOT EXISTS next_actions (
      id TEXT PRIMARY KEY,
      appointment_id TEXT NOT NULL REFERENCES appointments(id),
      description TEXT NOT NULL,
      due_date TEXT,
      completed INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS medications (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      dosage TEXT NOT NULL,
      frequency TEXT NOT NULL,
      prescribing_doctor_id TEXT NOT NULL REFERENCES doctors(id),
      start_date TEXT NOT NULL,
      end_date TEXT,
      active INTEGER NOT NULL DEFAULT 1,
      notes TEXT
    );

    CREATE TABLE IF NOT EXISTS visit_notes (
      id TEXT PRIMARY KEY,
      appointment_id TEXT NOT NULL REFERENCES appointments(id),
      content TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  return db;
}

const db = globalThis.__deltaHealthDb ?? createDb();
if (process.env.NODE_ENV !== "production") {
  globalThis.__deltaHealthDb = db;
}

export default db;
