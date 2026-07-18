import Link from "next/link";
import { getAllNextActionsWithContext } from "@/lib/data/nextActions";
import { cardClass } from "@/lib/styles";

export default function Home() {
  const sections = [
    { title: "Appointments", href: "/appointments", desc: "Upcoming, past, and rescheduled visits" },
    { title: "Doctors & Offices", href: "/doctors", desc: "Your care team and contact info" },
    { title: "Medications", href: "/medications", desc: "Active and past prescriptions" },
    { title: "Notes & Next Actions", href: "/notes", desc: "What happened, what's next" },
  ];

  const nextUp = getAllNextActionsWithContext()
    .filter((item) => !item.completed)
    .slice(0, 3);

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-medium mb-2">Delta Health</h1>
      <p className="text-gray-600 mb-8">
        Your VA and community care, organized in one place.
      </p>

      <div className="mb-8">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Next up</h2>
        {nextUp.length === 0 ? (
          <p className="text-gray-600">Nothing pending — you&apos;re caught up.</p>
        ) : (
          <div className="grid gap-2">
            {nextUp.map((item) => (
              <Link
                key={item.id}
                href={`/appointments/${item.appointmentId}`}
                className={`${cardClass} block hover:border-gray-400 transition`}
              >
                <div className="font-medium">{item.description}</div>
                <div className="text-sm text-gray-500">
                  {item.doctorName}
                  {item.dueDate && <> · due {new Date(item.dueDate).toLocaleDateString()}</>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-4">
        {sections.map((s) => (
          <a
            key={s.href}
            href={s.href}
            className="block border rounded-lg p-4 hover:border-gray-400 transition"
          >
            <div className="font-medium">{s.title}</div>
            <div className="text-sm text-gray-500">{s.desc}</div>
          </a>
        ))}
      </div>
    </main>
  );
}
