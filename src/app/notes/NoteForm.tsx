import { inputClass, labelClass, buttonClass } from "@/lib/styles";
import type { VisitNote } from "@/types";

export default function NoteForm({
  note,
  appointmentOptions,
  action,
}: {
  note?: VisitNote;
  appointmentOptions: { id: string; label: string }[];
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="grid gap-4">
      <div>
        <label className={labelClass} htmlFor="appointmentId">
          Appointment
        </label>
        <select
          id="appointmentId"
          name="appointmentId"
          defaultValue={note?.appointmentId ?? ""}
          required
          disabled={!!note}
          className={`${inputClass} disabled:bg-gray-100 disabled:text-gray-500`}
        >
          <option value="" disabled>
            Select an appointment
          </option>
          {appointmentOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="content">
          Note
        </label>
        <textarea
          id="content"
          name="content"
          defaultValue={note?.content}
          rows={4}
          required
          className={inputClass}
        />
      </div>

      <div>
        <button type="submit" className={buttonClass}>
          {note ? "Save changes" : "Add note"}
        </button>
      </div>
    </form>
  );
}
