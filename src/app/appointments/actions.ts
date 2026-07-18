"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAppointment, updateAppointment, rescheduleAppointment } from "@/lib/data/appointments";
import { addNextAction, toggleNextActionComplete } from "@/lib/data/nextActions";
import { requireString, requireDate, optionalString, optionalDate, requireOneOf } from "@/lib/validation";

const EDITABLE_STATUSES = ["scheduled", "completed", "cancelled", "no-show"] as const;

function parseAppointmentForm(formData: FormData) {
  return {
    doctorId: requireString(formData.get("doctorId"), "Doctor"),
    date: requireDate(formData.get("date"), "Date"),
    reasonForVisit: requireString(formData.get("reasonForVisit"), "Reason for visit"),
    whatHappened: optionalString(formData.get("whatHappened")),
    status: requireOneOf(formData.get("status"), EDITABLE_STATUSES, "Status"),
  };
}

export async function createAppointmentAction(formData: FormData) {
  const data = parseAppointmentForm(formData);
  const appointment = createAppointment(data);
  revalidatePath("/appointments");
  redirect(`/appointments/${appointment.id}`);
}

export async function updateAppointmentAction(id: string, formData: FormData) {
  const data = parseAppointmentForm(formData);
  updateAppointment(id, data);
  revalidatePath("/appointments");
  revalidatePath(`/appointments/${id}`);
  redirect(`/appointments/${id}`);
}

export async function rescheduleAppointmentAction(id: string, formData: FormData) {
  const newDate = requireDate(formData.get("newDate"), "New date");
  const rescheduled = rescheduleAppointment(id, newDate);
  revalidatePath("/appointments");
  redirect(`/appointments/${rescheduled.id}`);
}

export async function addNextActionAction(appointmentId: string, formData: FormData) {
  const description = requireString(formData.get("description"), "Description");
  const dueDate = optionalDate(formData.get("dueDate"), "Due date");
  addNextAction(appointmentId, description, dueDate);
  revalidatePath(`/appointments/${appointmentId}`);
  revalidatePath("/notes");
  redirect(`/appointments/${appointmentId}`);
}

export async function toggleNextActionAction(appointmentId: string, actionId: string) {
  toggleNextActionComplete(actionId);
  revalidatePath(`/appointments/${appointmentId}`);
  revalidatePath("/notes");
  revalidatePath("/");
}
