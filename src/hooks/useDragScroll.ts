import {
  useCallback,
  useEffect,
  useRef,
  MutableRefObject,
  PointerEventHandler,
} from "react";

export type UseDragScrollReturn<E extends HTMLElement> = {
  ref: MutableRefObject<E | null>;
  onPointerDown: PointerEventHandler<E>;
  onPointerUp: PointerEventHandler<E>;
  onPointerLeave: PointerEventHandler<E>;
};

/**
 * Add vertical and horizontal scrolling via click and drag or pointer events
 * to arbitrary scrolling elements.
 *
 * @returns a `dragProps` object that can be spread onto any HTML element's JSX.
 */
export const useDragScroll = <
  E extends HTMLElement = HTMLElement
>(): UseDragScrollReturn<E> => {
  const ref = useRef<E | null>(null);
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);
  const scrollLeft = useRef<number>(0);
  const scrollTop = useRef<number>(0);

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!ref.current) return;

    const x = e.pageX - ref.current.offsetLeft;
    const y = e.pageY - ref.current.offsetTop;

    ref.current.scrollLeft = scrollLeft.current - (x - startX.current);
    ref.current.scrollTop = scrollTop.current - (y - startY.current);
  }, []);

  const onPointerDown: PointerEventHandler<E> = useCallback(
    (e) => {
      if (!ref.current) return;

      startX.current = e.pageX - ref.current.offsetLeft;
      startY.current = e.pageY - ref.current.offsetTop;

      scrollLeft.current = ref.current.scrollLeft;
      scrollTop.current = ref.current.scrollTop;

      ref.current.addEventListener("pointermove", onPointerMove, {
        passive: true,
      });
    },
    [onPointerMove]
  );

  const onPointerUp: PointerEventHandler<E> = useCallback(() => {
    if (!ref.current) return;
    ref.current.removeEventListener("pointermove", onPointerMove);
  }, [onPointerMove]);

  const onPointerLeave: PointerEventHandler<E> = useCallback(() => {
    if (!ref.current) return;
    ref.current.removeEventListener("pointermove", onPointerMove);
  }, [onPointerMove]);

  useEffect(
    () => () => ref.current?.removeEventListener("pointermove", onPointerMove),
    [onPointerMove]
  );

  return {
    ref,
    onPointerDown,
    onPointerUp,
    onPointerLeave,
  };
};
