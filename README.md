# Delta Health

Helps veterans organize and track VA and community care — appointments, doctors,
medications, notes, and next action items — in one place. See
[`docs/MISSION.md`](docs/MISSION.md) for the full mission and approved source list.

## Stack

- Next.js (App Router), TypeScript, Tailwind CSS, SQLite (better-sqlite3)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Project structure

```
src/
  app/
    appointments/   list/detail/edit/new + reschedule flow, server actions
    doctors/        list/edit/new + delete confirmation, server actions
    medications/    list/edit/new, active/inactive toggle, server actions
    notes/          visit notes + cross-appointment next-action checklist
    page.tsx        home dashboard ("next up" widget + section nav)
  types/            shared TypeScript types (Doctor, Appointment, Medication, ...)
  lib/
    db.ts                enforces the SQLite schema, one connection per process
    validation.ts        server-side form validation helpers
    styles.ts            shared Tailwind class strings for forms/lists
    data/                per-entity CRUD access functions (doctors, appointments, medications, notes, nextActions)
    approvedSources.ts   enforced list of allowed external links (see docs/MISSION.md)
docs/
  MISSION.md         project mission and approved source list
```

## Status

Core CRUD is in place for doctors, appointments (with reschedule linking),
medications, and visit notes/next actions, backed by a local SQLite database
(`delta-health.db`, gitignored). VA.gov linking and auth are not implemented
yet — see the roadmap below. No auth means no access control, so this should
not hold real patient data until that's addressed.

## Roadmap (rough)

- [x] Pick a data layer — SQLite via better-sqlite3 (see `src/lib/db.ts`)
- [x] Doctors CRUD
- [x] Appointments CRUD + reschedule linking
- [x] Medications CRUD
- [x] Notes + next-action tracking per appointment
- [ ] VA.gov appointment linking/import
- [ ] Auth (needed before any real patient data is stored)
