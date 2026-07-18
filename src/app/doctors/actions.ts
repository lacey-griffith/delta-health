"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createDoctor, updateDoctor, deleteDoctor } from "@/lib/data/doctors";
import { requireString, optionalString } from "@/lib/validation";

function parseDoctorForm(formData: FormData) {
  return {
    name: requireString(formData.get("name"), "Name"),
    specialty: requireString(formData.get("specialty"), "Specialty"),
    facility: requireString(formData.get("facility"), "Facility"),
    isVA: formData.get("isVA") === "on",
    phone: optionalString(formData.get("phone")),
    email: optionalString(formData.get("email")),
    address: optionalString(formData.get("address")),
    notes: optionalString(formData.get("notes")),
  };
}

export async function createDoctorAction(formData: FormData) {
  const data = parseDoctorForm(formData);
  createDoctor(data);
  revalidatePath("/doctors");
  redirect("/doctors");
}

export async function updateDoctorAction(id: string, formData: FormData) {
  const data = parseDoctorForm(formData);
  updateDoctor(id, data);
  revalidatePath("/doctors");
  redirect("/doctors");
}

export async function deleteDoctorAction(id: string) {
  deleteDoctor(id);
  revalidatePath("/doctors");
  redirect("/doctors");
}
