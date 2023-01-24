/**
 * A component that always returns `null`. Useful for polymorphic
 * components that need to call *some* JSX, but not render anything
 * to the DOM.
 *
 * @param _ anything
 * @returns `null`
 */
export const Null = (_: any) => null;
