import { notFound } from "next/navigation";
import Link from "next/link";
import AppointmentForm from "../../AppointmentForm";
import { updateAppointmentAction } from "../../actions";
import { getAppointment } from "@/lib/data/appointments";
import { getDoctors } from "@/lib/data/doctors";
import { linkClass } from "@/lib/styles";

export default async function EditAppointmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const appointment = getAppointment(id);
  if (!appointment) notFound();

  if (appointment.status === "rescheduled") {
    return (
      <main className="min-h-screen p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-medium mb-2">Edit appointment</h1>
        <p className="text-gray-600 mb-4">
          This appointment was rescheduled and can no longer be edited directly.
        </p>
        <Link href={`/appointments/${id}`} className={linkClass}>
          Back to appointment
        </Link>
      </main>
    );
  }

  const doctors = getDoctors();

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-medium mb-6">Edit appointment</h1>
      <AppointmentForm
        appointment={appointment}
        doctors={doctors}
        action={updateAppointmentAction.bind(null, id)}
      />
    </main>
  );
}
