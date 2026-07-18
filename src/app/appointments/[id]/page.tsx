import { notFound } from "next/navigation";
import Link from "next/link";
import { getAppointment, findRescheduledAppointment } from "@/lib/data/appointments";
import { getDoctor } from "@/lib/data/doctors";
import { addNextActionAction, toggleNextActionAction } from "../actions";
import { buttonSecondaryClass, cardClass, inputClass, linkClass } from "@/lib/styles";

export default async function AppointmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const appointment = getAppointment(id);
  if (!appointment) notFound();

  const doctor = getDoctor(appointment.doctorId);
  const rescheduledTo =
    appointment.status === "rescheduled" ? findRescheduledAppointment(id) : undefined;
  const rescheduledFrom = appointment.rescheduledFromId
    ? getAppointment(appointment.rescheduledFromId)
    : undefined;

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-2">
        <h1 className="text-2xl font-medium">{appointment.reasonForVisit}</h1>
        <span className="shrink-0 text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-800 capitalize">
          {appointment.status}
        </span>
      </div>
      <p className="text-gray-600 mb-6">{new Date(appointment.date).toLocaleDateString()}</p>

      {rescheduledTo && (
        <div className="mb-4 text-sm text-gray-600">
          Rescheduled to{" "}
          <Link href={`/appointments/${rescheduledTo.id}`} className="underline">
            {new Date(rescheduledTo.date).toLocaleDateString()}
          </Link>
        </div>
      )}
      {rescheduledFrom && (
        <div className="mb-4 text-sm text-gray-600">
          Rescheduled from{" "}
          <Link href={`/appointments/${rescheduledFrom.id}`} className="underline">
            {new Date(rescheduledFrom.date).toLocaleDateString()}
          </Link>
        </div>
      )}

      <div className={`${cardClass} mb-6`}>
        <div className="font-medium mb-1">Doctor</div>
        {doctor ? (
          <>
            <div>
              {doctor.name} — {doctor.specialty}
            </div>
            <div className="text-sm text-gray-600">{doctor.facility}</div>
            {doctor.phone && <div className="text-sm text-gray-600">{doctor.phone}</div>}
          </>
        ) : (
          <div className="text-sm text-gray-500">Doctor not found.</div>
        )}
      </div>

      <div className="mb-6">
        <div className="font-medium mb-1">What happened</div>
        <p className="text-gray-700 whitespace-pre-wrap">
          {appointment.whatHappened || "Nothing recorded yet."}
        </p>
      </div>

      <div className="mb-6">
        <div className="font-medium mb-3">Next action items</div>
        {appointment.nextActionItems.length === 0 ? (
          <p className="text-sm text-gray-500 mb-3">No next actions yet.</p>
        ) : (
          <ul className="grid gap-2 mb-3">
            {appointment.nextActionItems.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <form action={toggleNextActionAction.bind(null, id, item.id)}>
                  <button
                    type="submit"
                    aria-label="Toggle complete"
                    className={`h-5 w-5 rounded border flex items-center justify-center text-xs ${
                      item.completed ? "bg-gray-900 text-white" : "bg-white"
                    }`}
                  >
                    {item.completed ? "✓" : ""}
                  </button>
                </form>
                <span className={item.completed ? "line-through text-gray-400" : ""}>
                  {item.description}
                </span>
                {item.dueDate && (
                  <span className="text-xs text-gray-500">
                    due {new Date(item.dueDate).toLocaleDateString()}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}

        <form action={addNextActionAction.bind(null, id)} className="flex gap-2">
          <input name="description" placeholder="New next action" required className={inputClass} />
          <input name="dueDate" type="date" className={`${inputClass} w-40`} />
          <button type="submit" className={buttonSecondaryClass}>
            Add
          </button>
        </form>
      </div>

      <div className="flex gap-4">
        {appointment.status !== "rescheduled" && (
          <Link href={`/appointments/${id}/edit`} className={linkClass}>
            Edit
          </Link>
        )}
        {appointment.status === "scheduled" && (
          <Link href={`/appointments/${id}/reschedule`} className={linkClass}>
            Reschedule
          </Link>
        )}
        <Link href="/appointments" className={linkClass}>
          Back to appointments
        </Link>
      </div>
    </main>
  );
}
