import { useEffect } from "react";

export type UseEventTarget = HTMLElement | SVGElement | Document | Window;

export type UseEventMap<E extends UseEventTarget> = E extends HTMLElement
  ? HTMLElementEventMap
  : E extends SVGElement
  ? SVGElementEventMap
  : E extends Document
  ? DocumentEventMap
  : WindowEventMap;

export type UseEventType<E extends UseEventTarget> = keyof UseEventMap<E>;

export const useEvent = <
  K extends UseEventType<T>,
  M extends UseEventMap<T>,
  T extends UseEventTarget = Document
>(
  type: K,
  listener: (this: T, ev: M[K]) => any,
  options?: boolean | AddEventListenerOptions,
  el?: T
) => {
  useEffect(() => {
    const target = el ?? document;
    // @ts-ignore
    target.addEventListener(type, listener, options);

    // @ts-ignore
    return () => target.removeEventListener(type, listener);
  }, [el, type]);
};
