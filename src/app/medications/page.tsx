import Link from "next/link";
import { getMedications } from "@/lib/data/medications";
import { getDoctors } from "@/lib/data/doctors";
import { toggleMedicationActiveAction } from "./actions";
import { buttonClass, buttonSecondaryClass, cardClass, linkClass } from "@/lib/styles";

export default function MedicationsPage() {
  const medications = getMedications();
  const doctors = getDoctors();
  const doctorNameById = new Map(doctors.map((d) => [d.id, d.name]));

  const active = medications.filter((m) => m.active);
  const inactive = medications.filter((m) => !m.active);

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-medium">Medications</h1>
        <Link href="/medications/new" className={buttonClass}>
          Add medication
        </Link>
      </div>

      {medications.length === 0 ? (
        <p className="text-gray-600">No medications yet.</p>
      ) : (
        <div className="grid gap-8">
          {[
            { label: "Active", items: active },
            { label: "Inactive / past", items: inactive },
          ].map(
            ({ label, items }) =>
              items.length > 0 && (
                <section key={label}>
                  <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                    {label} ({items.length})
                  </h2>
                  <div className="grid gap-3">
                    {items.map((med) => (
                      <div key={med.id} className={cardClass}>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="font-medium">
                              {med.name} — {med.dosage}
                            </div>
                            <div className="text-sm text-gray-600">{med.frequency}</div>
                            <div className="text-sm text-gray-500">
                              Prescribed by {doctorNameById.get(med.prescribingDoctorId) ?? "Unknown doctor"}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-4">
                          <Link href={`/medications/${med.id}/edit`} className={linkClass}>
                            Edit
                          </Link>
                          <form action={toggleMedicationActiveAction.bind(null, med.id)}>
                            <button type="submit" className={buttonSecondaryClass}>
                              Mark {med.active ? "inactive" : "active"}
                            </button>
                          </form>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )
          )}
        </div>
      )}
    </main>
  );
}
