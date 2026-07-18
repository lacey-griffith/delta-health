// Server-side form validation helpers. Every server action re-validates input
// here rather than trusting the client — forms are just the UI, not the boundary.

export function requireString(value: FormDataEntryValue | null, field: string): string {
  const str = typeof value === "string" ? value.trim() : "";
  if (!str) throw new Error(`${field} is required.`);
  return str;
}

export function optionalString(value: FormDataEntryValue | null): string | undefined {
  const str = typeof value === "string" ? value.trim() : "";
  return str ? str : undefined;
}

export function requireDate(value: FormDataEntryValue | null, field: string): string {
  const str = requireString(value, field);
  if (Number.isNaN(Date.parse(str))) throw new Error(`${field} is not a valid date.`);
  return str;
}

export function optionalDate(value: FormDataEntryValue | null, field: string): string | undefined {
  const str = optionalString(value);
  if (str === undefined) return undefined;
  if (Number.isNaN(Date.parse(str))) throw new Error(`${field} is not a valid date.`);
  return str;
}

export function requireOneOf<T extends string>(
  value: FormDataEntryValue | null,
  options: readonly T[],
  field: string
): T {
  const str = requireString(value, field);
  if (!options.includes(str as T)) {
    throw new Error(`${field} must be one of: ${options.join(", ")}.`);
  }
  return str as T;
}
