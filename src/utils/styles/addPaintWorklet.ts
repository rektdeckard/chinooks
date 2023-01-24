/**
 * Asynchronously load and register a CSS Paint Worklet module from text source
 *
 * @param src a string containing the source code of a paint worklet
 */
export const addPaintWorkletModuleFromSource = (
  src: string
): Promise<void> | void => {
  if (typeof window === "undefined" || !CSS || !("paintWorklet" in CSS)) {
    return;
  }

  return (CSS as any).paintWorklet.addModule(
    URL.createObjectURL(new Blob([src], { type: "text/javascript" }))
  );
};
