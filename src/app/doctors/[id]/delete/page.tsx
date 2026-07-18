import { notFound } from "next/navigation";
import Link from "next/link";
import { getDoctor, getDoctorReferenceCounts } from "@/lib/data/doctors";
import { deleteDoctorAction } from "../../actions";
import { buttonDangerClass, buttonSecondaryClass } from "@/lib/styles";

export default async function DeleteDoctorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doctor = getDoctor(id);
  if (!doctor) notFound();

  const refs = getDoctorReferenceCounts(id);
  const blocked = refs.appointments > 0 || refs.medications > 0;

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-medium mb-2">Delete {doctor.name}?</h1>

      {blocked ? (
        <>
          <p className="text-gray-600 mb-6">
            This doctor can&apos;t be deleted — still linked to {refs.appointments} appointment
            {refs.appointments === 1 ? "" : "s"} and {refs.medications} medication
            {refs.medications === 1 ? "" : "s"}. Remove or reassign those first.
          </p>
          <Link href="/doctors" className={buttonSecondaryClass}>
            Back to doctors
          </Link>
        </>
      ) : (
        <>
          <p className="text-gray-600 mb-6">This can&apos;t be undone.</p>
          <div className="flex gap-3">
            <form action={deleteDoctorAction.bind(null, id)}>
              <button type="submit" className={buttonDangerClass}>
                Delete
              </button>
            </form>
            <Link href="/doctors" className={buttonSecondaryClass}>
              Cancel
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
