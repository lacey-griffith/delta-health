import Link from "next/link";
import { getAppointments } from "@/lib/data/appointments";
import { getDoctors } from "@/lib/data/doctors";
import { buttonClass, cardClass } from "@/lib/styles";
import type { Appointment } from "@/types";

const STATUS_GROUPS: { status: Appointment["status"]; label: string }[] = [
  { status: "scheduled", label: "Scheduled" },
  { status: "completed", label: "Completed" },
  { status: "rescheduled", label: "Rescheduled" },
  { status: "cancelled", label: "Cancelled" },
  { status: "no-show", label: "No-show" },
];

export default function AppointmentsPage() {
  const appointments = getAppointments();
  const doctors = getDoctors();
  const doctorNameById = new Map(doctors.map((d) => [d.id, d.name]));

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium">Appointments</h1>
        <Link href="/appointments/new" className={buttonClass}>
          Add appointment
        </Link>
      </div>

      {appointments.length === 0 ? (
        <p className="text-gray-600">No appointments yet.</p>
      ) : (
        <div className="grid gap-8">
          {STATUS_GROUPS.map(({ status, label }) => {
            const group = appointments.filter((a) => a.status === status);
            if (group.length === 0) return null;
            return (
              <section key={status}>
                <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                  {label} ({group.length})
                </h2>
                <div className="grid gap-3">
                  {group.map((appt) => (
                    <Link
                      key={appt.id}
                      href={`/appointments/${appt.id}`}
                      className={`${cardClass} block hover:border-gray-400 transition`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="font-medium">
                            {doctorNameById.get(appt.doctorId) ?? "Unknown doctor"}
                          </div>
                          <div className="text-sm text-gray-600">{appt.reasonForVisit}</div>
                        </div>
                        <div className="text-sm text-gray-500 shrink-0">
                          {new Date(appt.date).toLocaleDateString()}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
}
