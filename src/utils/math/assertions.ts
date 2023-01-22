export function assertValidRange(min: number, max: number, value?: number) {
  if (min > max) throw new RangeError();
  if (!value) return;
  if (min > value || value > max) throw new RangeError();
}

export function castInteger<N extends Number>(n: N): number {
  const coerced = typeof n === "number" ? n : Number(n);

  if (!Number.isSafeInteger(coerced)) {
    throw new RangeError("Values must be safe integers");
  }

  return coerced;
}
