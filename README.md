# Delta Health

Helps veterans organize and track VA and community care — appointments, doctors,
medications, notes, and next action items — in one place. See
[`docs/MISSION.md`](docs/MISSION.md) for the full mission and approved source list.

## Stack

- Next.js 14 (App Router), TypeScript, Tailwind CSS

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
    appointments/   route + page for appointments
    doctors/        route + page for doctors/offices
    medications/    route + page for medications
    notes/          route + page for notes & next actions
    page.tsx        home dashboard
  types/            shared TypeScript types (Doctor, Appointment, Medication, ...)
  lib/
    approvedSources.ts   enforced list of allowed external links (see docs/MISSION.md)
docs/
  MISSION.md         project mission and approved source list
```

## Status

Early scaffold. Data model defined in `src/types/index.ts`; pages are stubs pending
a real data layer (VA.gov linking for appointments is the next priority — see mission).

## Roadmap (rough)

- [ ] Pick a data layer (local-first vs. hosted DB) — not yet decided
- [ ] Doctors CRUD
- [ ] Appointments CRUD + reschedule linking
- [ ] Medications CRUD
- [ ] Notes + next-action tracking per appointment
- [ ] VA.gov appointment linking/import
- [ ] Auth (needed before any real patient data is stored)
