import { assertValidRange, castInteger } from "./assertions";
import { uncheckedClamp } from "./transforms";

export type SaturatingOptions = {
  max: number;
  min?: number;
};

export class Saturating implements Number {
  #max: number;
  #min: number;
  #value: number;

  constructor({ max, min = 0 }: SaturatingOptions, value?: number) {
    if (
      !Number.isInteger(min) ||
      !Number.isInteger(max) ||
      (value && !Number.isInteger(value))
    ) {
      throw new RangeError("Values must be integers");
    }

    assertValidRange(min, max, value);

    this.#max = max;
    this.#min = min;
    this.#value = value ?? min;
  }

  static from(wrapping: Saturating) {
    return new Saturating(
      { max: wrapping.max, min: wrapping.min },
      wrapping.value
    );
  }

  add<N extends Number>(n: N) {
    const addend = typeof n === "number" ? n : Number(n);

    if (!Number.isInteger(addend)) {
      throw new RangeError("Values must be integers");
    }

    if (addend === 0) return this;

    this.#value = uncheckedClamp(this.#min, this.#max, this.#value + addend);
    return this;
  }

  sub<N extends Number>(n: N) {
    return this.add(-n);
  }

  mul<N extends Number>(n: N) {
    const multiplier = castInteger(n);
    if (multiplier === 1) return this;

    this.#value = uncheckedClamp(
      this.#min,
      this.#max,
      this.#value * multiplier
    );
    return this;
  }

  div<N extends Number>(n: N) {
    const divisor = castInteger(n);
    if (divisor === 0) throw new Error("Cannot divide by zero");

    this.#value = uncheckedClamp(
      this.#min,
      this.#max,
      Math.trunc(this.#value / divisor)
    );
    return this;
  }

  get value() {
    return this.#value;
  }

  get min() {
    return this.#min;
  }

  get max() {
    return this.#max;
  }

  valueOf(): number {
    return this.#value;
  }

  toFixed(fractionDigits?: number | undefined): string {
    return this.#value.toFixed(fractionDigits);
  }

  toExponential(fractionDigits?: number | undefined): string {
    return this.#value.toExponential(fractionDigits);
  }

  toPrecision(precision?: number | undefined): string {
    return this.#value.toPrecision(precision);
  }
}
