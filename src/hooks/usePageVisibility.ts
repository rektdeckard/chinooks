import { useState } from "react";
import { useEvent } from "./useEvent";

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
