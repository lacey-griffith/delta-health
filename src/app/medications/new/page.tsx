import Link from "next/link";
import MedicationForm from "../MedicationForm";
import { createMedicationAction } from "../actions";
import { getDoctors } from "@/lib/data/doctors";

export default function NewMedicationPage() {
  const doctors = getDoctors();

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-medium mb-6">Add medication</h1>
      {doctors.length === 0 ? (
        <p className="text-gray-600">
          Add a doctor first.{" "}
          <Link href="/doctors/new" className="underline">
            Add doctor
          </Link>
        </p>
      ) : (
        <MedicationForm doctors={doctors} action={createMedicationAction} />
      )}
    </main>
  );
}
