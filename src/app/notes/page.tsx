import Link from "next/link";
import { getVisitNotes } from "@/lib/data/notes";
import { getAppointments } from "@/lib/data/appointments";
import { getDoctors } from "@/lib/data/doctors";
import { getAllNextActionsWithContext } from "@/lib/data/nextActions";
import NoteForm from "./NoteForm";
import { createVisitNoteAction, deleteVisitNoteAction, toggleNextActionFromNotesAction } from "./actions";
import { cardClass, linkClass } from "@/lib/styles";

export default function NotesPage() {
  const notes = getVisitNotes();
  const appointments = getAppointments();
  const doctors = getDoctors();
  const doctorNameById = new Map(doctors.map((d) => [d.id, d.name]));
  const appointmentById = new Map(appointments.map((a) => [a.id, a]));

  const appointmentOptions = appointments.map((a) => ({
    id: a.id,
    label: `${doctorNameById.get(a.doctorId) ?? "Unknown doctor"} — ${new Date(
      a.date
    ).toLocaleDateString()} — ${a.reasonForVisit}`,
  }));

  const nextActions = getAllNextActionsWithContext();

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-medium mb-6">Notes & Next Actions</h1>

      <section className="mb-10">
        <h2 className="text-lg font-medium mb-3">Next actions</h2>
        {nextActions.length === 0 ? (
          <p className="text-gray-600">No next actions yet — add one from an appointment.</p>
        ) : (
          <ul className="grid gap-2">
            {nextActions.map((item) => (
              <li key={item.id} className={`${cardClass} flex items-center gap-3`}>
                <form action={toggleNextActionFromNotesAction.bind(null, item.id)}>
                  <button
                    type="submit"
                    aria-label="Toggle complete"
                    className={`h-5 w-5 rounded border flex items-center justify-center text-xs shrink-0 ${
                      item.completed ? "bg-gray-900 text-white" : "bg-white"
                    }`}
                  >
                    {item.completed ? "✓" : ""}
                  </button>
                </form>
                <div className="flex-1">
                  <div className={item.completed ? "line-through text-gray-400" : ""}>
                    {item.description}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.doctorName} — {new Date(item.appointmentDate).toLocaleDateString()}
                    {item.dueDate && <> · due {new Date(item.dueDate).toLocaleDateString()}</>}
                  </div>
                </div>
                <Link href={`/appointments/${item.appointmentId}`} className={linkClass}>
                  View
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-lg font-medium mb-3">Visit notes</h2>
        {appointments.length === 0 ? (
          <p className="text-gray-600">
            Add an appointment first.{" "}
            <Link href="/appointments/new" className="underline">
              Add appointment
            </Link>
          </p>
        ) : (
          <>
            <div className="mb-6">
              <NoteForm appointmentOptions={appointmentOptions} action={createVisitNoteAction} />
            </div>

            {notes.length === 0 ? (
              <p className="text-gray-600">No visit notes yet.</p>
            ) : (
              <ul className="grid gap-3">
                {notes.map((note) => {
                  const appt = appointmentById.get(note.appointmentId);
                  return (
                    <li key={note.id} className={cardClass}>
                      <div className="text-sm text-gray-500 mb-1">
                        {appt
                          ? `${doctorNameById.get(appt.doctorId) ?? "Unknown doctor"} — ${new Date(
                              appt.date
                            ).toLocaleDateString()}`
                          : "Appointment not found"}
                        {" · "}
                        {new Date(note.createdAt).toLocaleString()}
                      </div>
                      <p className="whitespace-pre-wrap mb-2">{note.content}</p>
                      <div className="flex gap-4">
                        <Link href={`/notes/${note.id}/edit`} className={linkClass}>
                          Edit
                        </Link>
                        <form action={deleteVisitNoteAction.bind(null, note.id)}>
                          <button type="submit" className={`${linkClass} bg-transparent border-0 p-0`}>
                            Delete
                          </button>
                        </form>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}
      </section>
    </main>
  );
}
