import DoctorForm from "../DoctorForm";
import { createDoctorAction } from "../actions";

export default function NewDoctorPage() {
  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-medium mb-6">Add doctor</h1>
      <DoctorForm action={createDoctorAction} />
    </main>
  );
}
