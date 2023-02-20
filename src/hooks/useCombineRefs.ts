import { LegacyRef, MutableRefObject, RefCallback, useCallback } from "react";

export const useCombineRefs = <E extends HTMLElement>(
  ...refs: (MutableRefObject<E | null> | LegacyRef<E>)[]
): RefCallback<E> => {
  return useCallback((value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref !== null) {
        (ref as MutableRefObject<E | null>).current = value;
      }
    });
  }, []);
};
