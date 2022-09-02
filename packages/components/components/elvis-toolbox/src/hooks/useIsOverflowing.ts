import React, { useLayoutEffect, useRef, useState } from 'react';

export interface OverflowDirection {
  horizontal: boolean;
  vertical: boolean;
}

/**
 * Hook to determine if an element is overflowing.
 *
 * @param elementRef Ref to the element to check for overflow. If no `ref` is provided, the hook will create one and return it.
 * @returns A tuple of an object`{horizontal: boolean; vertical: boolean}` indicating whether the element is overflowing, and a `ref`. If a `ref` was provided, the returned `ref` will be the same as the one provided.
 *
 * @example
 * export const Component: FC<Props> = () => {
 *   const elementRef = useRef<HTMLDivElement>(null);
 *   const [{ horizontal, vertical }] = useIsOverflowing(elementRef);
 *   // Without passing a ref, the hook will create one and return it.
 *   const [{ horizontal, vertical }, elementRef] = useIsOverflowing<HTMLDivElement>();
 *   ...
 *   return (<div ref={elementRef}></div>)
 * }
 *
 * @since 2.2.0
 */
export const useIsOverflowing = <T extends Element>(
  elementRef?: React.RefObject<T>,
): [OverflowDirection, React.RefObject<T>] => {
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
      const hasOverflowVertical = current.scrollHeight > current.clientHeight;
      const hasOverflowHorizontal = current.scrollWidth > current.clientWidth;
      setIsOverflowing({ horizontal: hasOverflowHorizontal, vertical: hasOverflowVertical });
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
