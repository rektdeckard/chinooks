import {
  useCallback,
  useState,
  MutableRefObject,
  PointerEventHandler,
  useRef,
} from "react";

export type UseHoverReturn<E extends HTMLElement> = [
  boolean,
  {
    ref: MutableRefObject<E | null>;
    onPointerEnter: PointerEventHandler<E>;
    onPointerLeave: PointerEventHandler<E>;
  }
];

/**
 * Detect hover on arbitrary elements
 *
 * @returns a `hoverProps` object that can be spread onto any HTML element's JSX.
 */
export const useHover = <
  E extends HTMLElement = HTMLElement
>(): UseHoverReturn<E> => {
  const ref = useRef<E>(null);
  const [isHovered, setHovered] = useState<boolean>(false);

  const onPointerEnter: PointerEventHandler<E> = useCallback(
    (_) => setHovered(true),
    []
  );
  const onPointerLeave: PointerEventHandler<E> = useCallback(
    (_) => setHovered(false),
    []
  );

  return [
    isHovered,
    {
      ref,
      onPointerEnter,
      onPointerLeave,
    },
  ];
};
