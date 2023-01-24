import { assertValidRange } from "./assertions";

export function uncheckedClamp(
  min: number,
  max: number,
  value: number
): number {
  return Math.min(Math.max(value, min), max);
}

export function clamp(min: number, max: number, value: number): number {
  assertValidRange(min, max);
  return uncheckedClamp(min, max, value);
}

export function lerp(min: number, max: number, value: number): number {
  if (0 > value || value > 1)
    throw new RangeError("Value must be between 0 and 1 inclusive");

  return min + (max - min) * value;
}
