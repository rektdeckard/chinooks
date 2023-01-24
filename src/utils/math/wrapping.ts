import { assertValidRange, castInteger } from "./assertions";

export type WrappingOptions = {
  max: number;
  min?: number;
};

export class Wrapping implements Number {
  #max: number;
  #min: number;
  #value: number;

  constructor({ max, min = 0 }: WrappingOptions, value?: number) {
    if (
      !Number.isSafeInteger(min) ||
      !Number.isSafeInteger(max) ||
      (value && !Number.isSafeInteger(value))
    ) {
      throw new RangeError("Wrapping values must be safe integers");
    }

    assertValidRange(min, max, value);

    this.#max = max;
    this.#min = min;
    this.#value = value ?? min;
  }

  static from(wrapping: Wrapping) {
    return new Wrapping(
      { max: wrapping.max, min: wrapping.min },
      wrapping.value
    );
  }

  add<N extends Number>(n: N) {
    const addend = castInteger(n);
    if (addend === 0) return this;

    if (
      this.#value + addend <= this.#max &&
      this.#value + addend >= this.#min
    ) {
      this.#value += addend;
      return this;
    }

    const modAddend = addend % (Math.abs(this.#max - this.#min) + 1);

    if (
      this.#value + modAddend <= this.#max &&
      this.#value + modAddend >= this.#min
    ) {
      this.#value += modAddend;
      return this;
    }

    if (modAddend > 0) {
      this.#value = modAddend - (this.#max - this.#value) + (this.#min - 1);
      return this;
    }

    if (modAddend < 0) {
      this.#value = modAddend - (this.#min - this.#value) + (this.#max + 1);
      return this;
    }

    return this;
  }

  sub<N extends Number>(n: N) {
    return this.add(-n);
  }

  // mul<N extends Number>(n: N) {
  //   const multiplier = castInteger(n);
  //   if (multiplier === 1) return this;
  //   //  FIXME: what do we do if 0 is out of range?
  //   // if (multiplier === 0) {
  //   //   this.#value = 0;
  //   //   return this;
  //   // }

  //   this.#value =
  //     ((this.#value * multiplier) % (this.#max - this.#min + 1)) + this.#min;
  //   return this;
  // }

  // div<N extends Number>(n: N) {
  //   const divisor = castInteger(n);
  //   if (divisor === 1) return this;
  //   if (divisor === 0) throw new Error("Cannot divide by zero");

  //   const absolute = Math.trunc(this.#value / divisor);

  //   if (absolute >= this.#min && absolute <= this.#max) {
  //     this.#value = absolute;
  //     return this;
  //   }

  //   const modAmount = absolute % (Math.abs(this.#max - this.#min) + 1);

  //   // TODO
  // }

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
