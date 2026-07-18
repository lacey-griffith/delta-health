import Link from "next/link";
import AppointmentForm from "../AppointmentForm";
import { createAppointmentAction } from "../actions";
import { getDoctors } from "@/lib/data/doctors";

export default function NewAppointmentPage() {
  const doctors = getDoctors();

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-medium mb-6">Add appointment</h1>
      {doctors.length === 0 ? (
        <p className="text-gray-600">
          Add a doctor first.{" "}
          <Link href="/doctors/new" className="underline">
            Add doctor
          </Link>
        </p>
      ) : (
        <AppointmentForm doctors={doctors} action={createAppointmentAction} />
      )}
    </main>
  );
}
