import { notFound } from "next/navigation";
import Link from "next/link";
import { getAppointment } from "@/lib/data/appointments";
import { rescheduleAppointmentAction } from "../../actions";
import { inputClass, labelClass, buttonClass, linkClass } from "@/lib/styles";

export default async function RescheduleAppointmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const appointment = getAppointment(id);
  if (!appointment) notFound();

  if (appointment.status !== "scheduled") {
    return (
      <main className="min-h-screen p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-medium mb-2">Reschedule appointment</h1>
        <p className="text-gray-600 mb-4">Only scheduled appointments can be rescheduled.</p>
        <Link href={`/appointments/${id}`} className={linkClass}>
          Back to appointment
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-medium mb-2">Reschedule appointment</h1>
      <p className="text-gray-600 mb-6">
        This marks the current appointment as rescheduled and creates a new one on the date below.
      </p>
      <form action={rescheduleAppointmentAction.bind(null, id)} className="grid gap-4 max-w-sm">
        <div>
          <label className={labelClass} htmlFor="newDate">
            New date
          </label>
          <input id="newDate" name="newDate" type="date" required className={inputClass} />
        </div>
        <div className="flex gap-3">
          <button type="submit" className={buttonClass}>
            Reschedule
          </button>
          <Link href={`/appointments/${id}`} className={linkClass}>
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
