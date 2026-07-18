"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createMedication, updateMedication, toggleMedicationActive } from "@/lib/data/medications";
import { requireString, requireDate, optionalDate, optionalString } from "@/lib/validation";

function parseMedicationForm(formData: FormData) {
  return {
    name: requireString(formData.get("name"), "Name"),
    dosage: requireString(formData.get("dosage"), "Dosage"),
    frequency: requireString(formData.get("frequency"), "Frequency"),
    prescribingDoctorId: requireString(formData.get("prescribingDoctorId"), "Prescribing doctor"),
    startDate: requireDate(formData.get("startDate"), "Start date"),
    endDate: optionalDate(formData.get("endDate"), "End date"),
    active: formData.get("active") === "on",
    notes: optionalString(formData.get("notes")),
  };
}

export async function createMedicationAction(formData: FormData) {
  const data = parseMedicationForm(formData);
  createMedication(data);
  revalidatePath("/medications");
  redirect("/medications");
}

export async function updateMedicationAction(id: string, formData: FormData) {
  const data = parseMedicationForm(formData);
  updateMedication(id, data);
  revalidatePath("/medications");
  redirect("/medications");
}

export async function toggleMedicationActiveAction(id: string) {
  toggleMedicationActive(id);
  revalidatePath("/medications");
}
