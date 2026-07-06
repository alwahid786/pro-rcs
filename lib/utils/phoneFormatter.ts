export function formatPhoneNumber(value: string) {
  if (!value) return "";

  // Strip all non-digit characters
  let cleaned = value.replace(/\D/g, "");

  // If it starts with '1', strip it to prevent duplicate country code format (+1)
  if (cleaned.startsWith("1")) {
    cleaned = cleaned.substring(1);
  }

  // Cap at 10 digits
  cleaned = cleaned.substring(0, 10);

  const len = cleaned.length;

  if (len === 0) {
    return "";
  }
  if (len <= 3) {
    return `+1 (${cleaned}`;
  }
  if (len <= 6) {
    return `+1 (${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  }

  return `+1 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
}
