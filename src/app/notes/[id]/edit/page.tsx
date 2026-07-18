import { notFound } from "next/navigation";
import NoteForm from "../../NoteForm";
import { updateVisitNoteAction } from "../../actions";
import { getVisitNote } from "@/lib/data/notes";
import { getAppointments } from "@/lib/data/appointments";
import { getDoctors } from "@/lib/data/doctors";

export default async function EditNotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const note = getVisitNote(id);
  if (!note) notFound();

  const appointments = getAppointments();
  const doctors = getDoctors();
  const doctorNameById = new Map(doctors.map((d) => [d.id, d.name]));
  const appointmentOptions = appointments.map((a) => ({
    id: a.id,
    label: `${doctorNameById.get(a.doctorId) ?? "Unknown doctor"} — ${new Date(
      a.date
    ).toLocaleDateString()} — ${a.reasonForVisit}`,
  }));

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-medium mb-6">Edit note</h1>
      <NoteForm
        note={note}
        appointmentOptions={appointmentOptions}
        action={updateVisitNoteAction.bind(null, id)}
      />
    </main>
  );
}
