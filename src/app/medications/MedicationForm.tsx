import type { Doctor, Medication } from "@/types";
import { inputClass, labelClass, buttonClass } from "@/lib/styles";

export default function MedicationForm({
  medication,
  doctors,
  action,
}: {
  medication?: Medication;
  doctors: Doctor[];
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="grid gap-4">
      <div>
        <label className={labelClass} htmlFor="name">
          Name
        </label>
        <input id="name" name="name" defaultValue={medication?.name} required className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="dosage">
            Dosage
          </label>
          <input
            id="dosage"
            name="dosage"
            defaultValue={medication?.dosage}
            required
            className={inputClass}
            placeholder="e.g. 10mg"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="frequency">
            Frequency
          </label>
          <input
            id="frequency"
            name="frequency"
            defaultValue={medication?.frequency}
            required
            className={inputClass}
            placeholder="e.g. twice daily"
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="prescribingDoctorId">
          Prescribing doctor
        </label>
        <select
          id="prescribingDoctorId"
          name="prescribingDoctorId"
          defaultValue={medication?.prescribingDoctorId ?? ""}
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="startDate">
            Start date
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            defaultValue={medication?.startDate.slice(0, 10)}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="endDate">
            End date
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            defaultValue={medication?.endDate?.slice(0, 10)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="active"
          name="active"
          type="checkbox"
          defaultChecked={medication?.active ?? true}
          className="h-4 w-4"
        />
        <label htmlFor="active" className="text-sm">
          Active
        </label>
      </div>

      <div>
        <label className={labelClass} htmlFor="notes">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          defaultValue={medication?.notes}
          rows={3}
          className={inputClass}
        />
      </div>

      <div>
        <button type="submit" className={buttonClass}>
          {medication ? "Save changes" : "Add medication"}
        </button>
      </div>
    </form>
  );
}
