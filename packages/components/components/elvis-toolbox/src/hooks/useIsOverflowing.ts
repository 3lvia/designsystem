import React, { useLayoutEffect, useRef, useState } from 'react';

export interface OverflowDirection {
  horizontal: boolean;
  vertical: boolean;
}

/**
 * Hook to determine if an element is overflowing.
 *
 * @param elementRef Ref to the element to check for overflow. If no `ref` is provided, the hook will create one and return it.
 * @returns An object containing an object `{horizontal: boolean; vertical: boolean}` indicating whether the element is overflowing, and a `ref`. If `elementRef` was provided, the returned `ref` will be the same as the one provided.
 *
 * @example
 * export const Component: FC<Props> = () => {
 *   const elementRef = useRef<HTMLDivElement>(null);
 *   const { isOverflowing: { horizontal, vertical } } = useIsOverflowing(elementRef);
 *   // Without passing a ref, the hook will create one and return it.
 *   const { isOverflowing: { horizontal, vertical }, ref: elementRef } = useIsOverflowing<HTMLDivElement>();
 *   ...
 *   return (<div ref={elementRef}>...</div>)
 * }
 *
 * @since 4.1.0
 */
export const useIsOverflowing = <T extends HTMLElement>(
  elementRef?: React.RefObject<T>,
): { isOverflowing: OverflowDirection; ref: React.RefObject<T> } => {
  const [isOverflowing, setIsOverflowing] = useState<OverflowDirection>({
    horizontal: false,
    vertical: false,
  });
  const defaultRef = useRef<T>(null);
  const ref = elementRef ?? defaultRef;

  useLayoutEffect(() => {
    const { current } = ref;
    const trigger = () => {
      if (!current) return;
      const hasOverflowVertical = current.scrollHeight - 1 > current.clientHeight;
      const hasOverflowHorizontal = current.scrollWidth - 1 > current.clientWidth;
      setIsOverflowing({ horizontal: hasOverflowHorizontal, vertical: hasOverflowVertical });
    };
    if (current) {
      if (window && 'ResizeObserver' in window) {
        new ResizeObserver(trigger).observe(current);
      }
      trigger();
    }
  }, [ref, ref.current]);

  return { isOverflowing, ref };
};
