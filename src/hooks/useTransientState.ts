import { useCallback, useEffect, useState, SetStateAction } from "react";
import { useTimeoutFunction } from "./useTimeoutFunction";

/**
 * A state hook for conveniently and temporarily transitioning to a transient
 * state before returning to a base state.
 *
 * @param baseState default state value, returns to this value after timeout
 * @param ms delay in milliseconds after transition before returning to `baseState`
 * @returns a tuple of value and dispatch, compare to `useState`
 */
export const useTransientState = <T>(
  baseState: T,
  ms: number = 1000
): [T, (transientValue: SetStateAction<T>) => void] => {
  const [value, setValue] = useState<T>(baseState);
  const [, cancel, restart] = useTimeoutFunction(() => setValue(baseState), ms);

  useEffect(() => {
    cancel();
    setValue(baseState);
  }, [baseState, ms]);

  const setTransientValue = useCallback(
    (transientValue: SetStateAction<T>): void => {
      setValue(transientValue);
      restart();
    },
    [restart]
  );

  return [value, setTransientValue];
};
