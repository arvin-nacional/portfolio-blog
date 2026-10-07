export function positivePage(value: unknown, fallback = 1): number {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? Math.min(number, 1000) : fallback;
}

export function literalSearch(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, 120) : "";
}

export function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function searchQuery(value: string) {
  return value ? { $or: ["title", "content"].map(field => ({ [field]: { $regex: escapeRegex(value), $options: "i" } })) } : {};
}
