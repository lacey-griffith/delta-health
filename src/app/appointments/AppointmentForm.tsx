import type { Appointment, Doctor } from "@/types";
import { inputClass, labelClass, buttonClass } from "@/lib/styles";

const STATUS_OPTIONS: { value: Appointment["status"]; label: string }[] = [
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "no-show", label: "No-show" },
];

export default function AppointmentForm({
  appointment,
  doctors,
  action,
}: {
  appointment?: Appointment;
  doctors: Doctor[];
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="grid gap-4">
      <div>
        <label className={labelClass} htmlFor="doctorId">
          Doctor
        </label>
        <select
          id="doctorId"
          name="doctorId"
          defaultValue={appointment?.doctorId ?? ""}
          required
          className={inputClass}
        >
          <option value="" disabled>
            Select a doctor
          </option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} — {d.specialty}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="date">
          Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          defaultValue={appointment?.date.slice(0, 10)}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="reasonForVisit">
          Reason for visit
        </label>
        <input
          id="reasonForVisit"
          name="reasonForVisit"
          defaultValue={appointment?.reasonForVisit}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="status">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={appointment?.status ?? "scheduled"}
          required
          className={inputClass}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">
          To reschedule, use the Reschedule action instead of setting status here.
        </p>
      </div>

      <div>
        <label className={labelClass} htmlFor="whatHappened">
          What happened
        </label>
        <textarea
          id="whatHappened"
          name="whatHappened"
          defaultValue={appointment?.whatHappened}
          rows={3}
          className={inputClass}
        />
      </div>

      <div>
        <button type="submit" className={buttonClass}>
          {appointment ? "Save changes" : "Add appointment"}
        </button>
      </div>
    </form>
  );
}
