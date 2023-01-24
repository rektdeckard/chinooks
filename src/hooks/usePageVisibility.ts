import { useState } from "react";

import { useEvent } from "./useEvent";

/**
 * Listens for the `visibilitychange` event, fires an optional callback,
 * and returns the current document's visibility state as a `boolean`.
 *
 * @param listener an optional callback to fire on the event
 * @param options {@link AddEventListenerOptions}
 * @returns wheter the document is currently visible or not
 */
export const usePageVisibility = (
  listener?: (ev: Event) => any,
  options?: boolean | AddEventListenerOptions | undefined
) => {
  const [isVisible, setIsVisible] = useState<boolean>(
    document.visibilityState === "visible"
  );
  useEvent(
    "visibilitychange",
    (e) => {
      setIsVisible(document.visibilityState === "visible");
      listener?.(e);
    },
    options
  );

  return isVisible;
};
