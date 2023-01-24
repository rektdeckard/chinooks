import { useEffect, useRef, useState } from "react";

import { noOp } from "../utils";

/**
 * Attach a {@link ResizeObserver} to an element to measure its size and
 * be notified when it changes.
 *
 * @param el an optional reference to the element to be measured.
 * If not provided, the `ref` returned from the hook may be attached
 * to the element instead.
 * @param options {@link ResizeObserverOptions}
 * @returns an object with a `ref` to the element and a `size` {@link DOMRectReadOnly}
 */
export const useElementSize = <E extends Element = Element>(
  el?: E | null,
  options?: ResizeObserverOptions
) => {
  const ref = useRef<E | null>(el ?? null);
  const [size, setSize] = useState<DOMRectReadOnly>(new DOMRectReadOnly());

  useEffect(() => {
    if (ref.current && !!window?.ResizeObserver) {
      const observer = new ResizeObserver(([entry]) => {
        setSize(entry.contentRect);
      });
      observer.observe(ref.current, options);

      return () => {
        observer?.disconnect();
      };
    } else {
      return noOp;
    }
  }, []);

  return { ref, size };
};
