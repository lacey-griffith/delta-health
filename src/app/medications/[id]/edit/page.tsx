import { notFound } from "next/navigation";
import MedicationForm from "../../MedicationForm";
import { updateMedicationAction } from "../../actions";
import { getMedication } from "@/lib/data/medications";
import { getDoctors } from "@/lib/data/doctors";

export default async function EditMedicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const medication = getMedication(id);
  if (!medication) notFound();

  const doctors = getDoctors();

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-medium mb-6">Edit medication</h1>
      <MedicationForm
        medication={medication}
        doctors={doctors}
        action={updateMedicationAction.bind(null, id)}
      />
    </main>
  );
}
