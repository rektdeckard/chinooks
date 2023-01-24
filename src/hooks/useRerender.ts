import { useReducer } from "react";

const renderReducer = (n: number): number => (n + 1) % 1_000_000;

/**
 * A simple hook the forces a rerender of the calling component
 *
 * @returns a callback that can be executed to force rerenders
 */
export const useRerender = (): (() => void) => {
  const [, rerender] = useReducer(renderReducer, 0);
  return rerender;
};
