import { notFound } from "next/navigation";
import DoctorForm from "../../DoctorForm";
import { updateDoctorAction } from "../../actions";
import { getDoctor } from "@/lib/data/doctors";

export default async function EditDoctorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doctor = getDoctor(id);
  if (!doctor) notFound();

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-medium mb-6">Edit doctor</h1>
      <DoctorForm doctor={doctor} action={updateDoctorAction.bind(null, id)} />
    </main>
  );
}
