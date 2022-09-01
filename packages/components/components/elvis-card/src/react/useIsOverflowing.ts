import React from 'react';

/**
 * Hook to determine if an element is overflowing vertically.
 *
 * @param elementRef Ref to the element to check for overflow. If no ref is provided, the hook will create one and return it.
 * @returns A tuple of a boolean indicating whether the element is overflowing, and a ref. If a ref was provided, the returned ref will be the same as the one provided.
 *
 * @example
 * const elementRef = useRef<HTMLDivElement>(null);
 * const [elementIsOverflowing] = useIsOverflowing(elementRef);
 * ...
 * <div ref={elementRef}></div>
 * ...
 * // Without passing a ref, the hook will create one and return it.
 * const [elementIsOverflowing, elementRef] = useIsOverflowing<HTMLDivElement>();
 * ...
 * <div ref={elementRef}></div>
 */
export const useIsOverflowing = <T extends Element>(
  elementRef?: React.RefObject<T>,
): [boolean, React.RefObject<T>] => {
  const [isOverflowing, setIsOverflowing] = React.useState(false);
  const defaultRef = React.useRef<T>(null);
  const ref = elementRef ?? defaultRef;

  React.useLayoutEffect(() => {
    const { current } = ref;
    const trigger = () => {
      if (!current) return;
      const hasOverflow = current.scrollHeight > current.clientHeight;
      setIsOverflowing(hasOverflow);
    };
    if (current) {
      if (window && 'ResizeObserver' in window) {
        new ResizeObserver(trigger).observe(current);
      }
      trigger();
    }
  }, [ref]);

  return [isOverflowing, ref];
};
