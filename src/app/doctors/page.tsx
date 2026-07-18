import Link from "next/link";
import { getDoctors } from "@/lib/data/doctors";
import { buttonClass, cardClass, linkClass } from "@/lib/styles";

export default function DoctorsPage() {
  const doctors = getDoctors();

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium">Doctors & Offices</h1>
        <Link href="/doctors/new" className={buttonClass}>
          Add doctor
        </Link>
      </div>

      {doctors.length === 0 ? (
        <p className="text-gray-600">No doctors yet. Add your first one to get started.</p>
      ) : (
        <div className="grid gap-4">
          {doctors.map((doctor) => (
            <div key={doctor.id} className={cardClass}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium">{doctor.name}</div>
                  <div className="text-sm text-gray-600">
                    {doctor.specialty} — {doctor.facility}
                  </div>
                </div>
                <span
                  className={`shrink-0 text-xs font-medium px-2 py-1 rounded-full ${
                    doctor.isVA ? "bg-blue-100 text-blue-800" : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {doctor.isVA ? "VA" : "Community Care"}
                </span>
              </div>
              <div className="mt-3 flex gap-4">
                <Link href={`/doctors/${doctor.id}/edit`} className={linkClass}>
                  Edit
                </Link>
                <Link href={`/doctors/${doctor.id}/delete`} className={linkClass}>
                  Delete
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
