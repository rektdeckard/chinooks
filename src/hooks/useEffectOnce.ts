import { EffectCallback, useEffect } from "react";

/**
 * Runs provided side-effect exactly once on mount. More expressive than
 * `useEffect` with empty dependencies list, as it communicates intent and
 * does not need an ESLint ignore.
 *
 * Unlike `useEffect`, async callbacks can be passed directly without wrapping,
 * provided they return `Promise<void>`.
 *
 * @param effect is only run once, so closure dependencies are irrelevant
 */
export const useEffectOnce = (
  effect: EffectCallback | (() => Promise<void>)
) => {
  useEffect(() => {
    const res = effect();
    if (!(res instanceof Promise)) {
      return res;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
