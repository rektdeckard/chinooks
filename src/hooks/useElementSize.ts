import { useEffect, useRef, useState } from "react";
import { noOp } from "../utils";

export const useElementSize = <E extends Element = Element>(
  el?: E,
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
