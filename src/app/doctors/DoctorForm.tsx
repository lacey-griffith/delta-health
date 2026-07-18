import type { Doctor } from "@/types";
import { inputClass, labelClass, buttonClass } from "@/lib/styles";

export default function DoctorForm({
  doctor,
  action,
}: {
  doctor?: Doctor;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="grid gap-4">
      <div>
        <label className={labelClass} htmlFor="name">
          Name
        </label>
        <input id="name" name="name" defaultValue={doctor?.name} required className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="specialty">
            Specialty
          </label>
          <input
            id="specialty"
            name="specialty"
            defaultValue={doctor?.specialty}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="facility">
            Facility
          </label>
          <input
            id="facility"
            name="facility"
            defaultValue={doctor?.facility}
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="isVA"
          name="isVA"
          type="checkbox"
          defaultChecked={doctor?.isVA ?? true}
          className="h-4 w-4"
        />
        <label htmlFor="isVA" className="text-sm">
          VA provider (unchecked = community care)
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone
          </label>
          <input id="phone" name="phone" defaultValue={doctor?.phone} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={doctor?.email}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="address">
          Address
        </label>
        <input id="address" name="address" defaultValue={doctor?.address} className={inputClass} />
      </div>

      <div>
        <label className={labelClass} htmlFor="notes">
          Notes
        </label>
        <textarea id="notes" name="notes" defaultValue={doctor?.notes} rows={3} className={inputClass} />
      </div>

      <div>
        <button type="submit" className={buttonClass}>
          {doctor ? "Save changes" : "Add doctor"}
        </button>
      </div>
    </form>
  );
}
