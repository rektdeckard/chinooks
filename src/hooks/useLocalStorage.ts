import { useCallback, useState, Dispatch, SetStateAction } from "react";

type Initializer<S> = () => S;
type Setter<S> = (prev: S) => S;
type Action<S> = S | Setter<S> | Initializer<S>;

let prefix = "__chinook_";

function expand<S extends object>(action: Action<S>, prev?: S) {
  if (typeof action === "function") {
    return (action as Setter<S>)(prev!);
  } else {
    return action;
  }
}

export const useLocalStorage = <S extends object>(
  key: string,
  fallbackState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] => {
  const [value, setValue] = useState<S>(() => {
    let val = localStorage.getItem(prefix + key);
    if (val) return JSON.parse(val) as S;
    return expand(fallbackState);
  });

  const set: Dispatch<SetStateAction<S>> = useCallback((val) => {
    setValue((prev) => {
      const next = expand(val, prev);
      sessionStorage.setItem(prefix + key, JSON.stringify(next));
      return next;
    });
  }, []);

  return [value, set];
};
