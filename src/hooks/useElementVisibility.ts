import { useState, useRef, RefObject, MutableRefObject } from "react";
import { useEffectOnce } from "./useEffectOnce";

export type ElementVisibility<E extends Element> = {
  ref: MutableRefObject<E | null>;
  isVisible: boolean;
  wasVisible: boolean;
  isInViewport: boolean;
  wasInViewport: boolean;
};

export type UseElementVisibilityProps<E extends Element, N extends Node> = {
  target?: RefObject<E> | E | string | null;
  intersectionOptions?: IntersectionObserverInit;
  mutationTarget?: RefObject<N> | N | string | null;
  mutationOptions?: MutationObserverInit;
};

export const useElementVisibility = <E extends Element, N extends Node>({
  target,
  intersectionOptions,
  mutationTarget,
  mutationOptions,
}: UseElementVisibilityProps<E, N>): ElementVisibility<E> => {
  const ref = useRef(
    typeof target === "string"
      ? document.querySelector<E>(target)
      : (target as RefObject<E>)?.current ?? (target as E)
  );

  const [isInViewport, setIsInViewport] = useState<boolean>(false);
  const wasInViewportRef = useRef<boolean>(false);

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const wasVisibleRef = useRef<boolean>(false);

  useEffectOnce(() => {
    const element =
      typeof target === "string"
        ? document.querySelector(target)
        : (target as RefObject<Element>)?.current ?? target;

    if (!element || !(element instanceof Element)) return;

    const intersectionObserver = new IntersectionObserver((entries) => {
      const isIntersecting = !!entries[0]?.isIntersecting;
      let isCurrentlyVisible = false;

      if (isIntersecting) {
        const { x, y, width, height } = entries[0].boundingClientRect;
        const cx = x + width / 2;
        const cy = y + height / 2;

        isCurrentlyVisible = element.contains(
          document.elementFromPoint(cx, cy)
        );

        if (isCurrentlyVisible && !wasVisibleRef.current) {
          wasVisibleRef.current = true;
        }

        if (!wasInViewportRef.current) {
          wasInViewportRef.current = true;
        }
      }

      setIsInViewport(isIntersecting);
      setIsVisible(isCurrentlyVisible);
    }, intersectionOptions);

    const mutationObserver = !mutationTarget
      ? null
      : new MutationObserver((records) => {
          if (!records.length) return;

          const { x, y, width, height } = element.getBoundingClientRect();
          const cx = x + width / 2;
          const cy = y + height / 2;

          const isCurrentlyVisible = element.contains(
            document.elementFromPoint(cx, cy)
          );
          if (isCurrentlyVisible && !wasVisibleRef.current) {
            wasVisibleRef.current = true;
          }

          setIsVisible(isCurrentlyVisible);
        });

    if (mutationObserver) {
      const mutationNode =
        typeof mutationTarget === "string"
          ? document.querySelector(mutationTarget as string)
          : (mutationTarget as RefObject<Node>)?.current ??
            (mutationTarget as Node);

      if (mutationNode) {
        mutationObserver?.observe(mutationNode, mutationOptions);
      }
    }

    intersectionObserver.observe(element);

    return () => {
      mutationObserver?.disconnect();
      if (element) {
        intersectionObserver.unobserve(element);
      }
    };
  });

  return {
    ref,
    isVisible,
    wasVisible: wasInViewportRef.current,
    isInViewport,
    wasInViewport: wasInViewportRef.current,
  };
};

export default useElementVisibility;
