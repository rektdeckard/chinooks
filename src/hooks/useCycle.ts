import { useCallback, useRef, useState } from "react";

/**
 * A state hook that can transition between a list of possible states
 *
 * @param values an iterable (Array, Set) list of values
 * @param startIndex an optional index of the starting value (defaults to 0)
 * @returns a tuple of current value and step function, to step n steps (wrapping) through values
 */
export const useCycle = <T>(
  values: Iterable<T>,
  startIndex?: number
): [T, (idx?: number) => void] => {
  const index = useRef<number>(startIndex ?? 0);
  const [value, setValue] = useState<T>([...values][index.current]);

  const cycle = useCallback(
    (idx?: number) => {
      const arr = [...values];
      index.current =
        typeof idx !== "number" ? (index.current + 1) % arr.length : idx;
      setValue(arr[index.current]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...values]
  );

  return [value, cycle];
};

/**
 * A state hook that can transition between a list of possible states.
 * Like `useCycle`, but more performant and guarantees a stable function reference
 * for the lifetime of the hook. Only safe when the cycle options do not change.
 *
 * @param values an iterable (Array, Set) list of values
 * @param startIndex an optional index of the starting value (defaults to 0)
 * @returns a tuple of current value and step function, to step n steps (wrapping) through values
 */
export const useCycleStable = <T>(
  values: Iterable<T>,
  startIndex?: number
): [T, (steps?: number) => void] => {
  const valuesRef = useRef<T[]>(Array.isArray(values) ? values : [...values]);
  const [index, setIndex] = useState<number>(startIndex ?? 0);

  const cycle = useCallback((steps?: number) => {
    setIndex(
      (idx) =>
        (steps ? idx + steps + valuesRef.current.length : idx + 1) %
        valuesRef.current.length
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [valuesRef.current[index], cycle];
};
