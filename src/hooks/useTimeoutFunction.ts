import { useCallback, useEffect, useRef } from "react";

type UseTimeoutFunctionReturn = [() => boolean | null, () => void, () => void];

/**
 * A cancellable and restartable timeout hook
 *
 * @param fn a callback function to be run after `ms` milliseconds
 * @param ms delay in milliseconds before executing callback
 * @returns a tuple of `isReady` getter, cancel function, and restart function
 */
export const useTimeoutFunction = (
  fn: () => void,
  ms: number = 0
): UseTimeoutFunctionReturn => {
  const ready = useRef<boolean | null>(false);
  const timeout = useRef<NodeJS.Timeout>();
  const callback = useRef(fn);

  const isReady = useCallback(() => ready.current, []);

  const restart = useCallback(() => {
    ready.current = false;
    timeout.current && clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      ready.current = true;
      callback.current();
    }, ms);
  }, [ms]);

  const cancel = useCallback(() => {
    ready.current = null;
    timeout.current && clearTimeout(timeout.current);
  }, []);

  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  useEffect(() => {
    restart();
    return cancel;
  }, [ms]);

  return [isReady, cancel, restart];
};
