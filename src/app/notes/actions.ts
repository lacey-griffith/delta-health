"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createVisitNote, updateVisitNote, deleteVisitNote } from "@/lib/data/notes";
import { toggleNextActionComplete } from "@/lib/data/nextActions";
import { requireString } from "@/lib/validation";

export async function createVisitNoteAction(formData: FormData) {
  const appointmentId = requireString(formData.get("appointmentId"), "Appointment");
  const content = requireString(formData.get("content"), "Note");
  createVisitNote({ appointmentId, content });
  revalidatePath("/notes");
  redirect("/notes");
}

export async function updateVisitNoteAction(id: string, formData: FormData) {
  const content = requireString(formData.get("content"), "Note");
  updateVisitNote(id, content);
  revalidatePath("/notes");
  redirect("/notes");
}

export async function deleteVisitNoteAction(id: string) {
  deleteVisitNote(id);
  revalidatePath("/notes");
}

export async function toggleNextActionFromNotesAction(actionId: string) {
  toggleNextActionComplete(actionId);
  revalidatePath("/notes");
  revalidatePath("/");
}
