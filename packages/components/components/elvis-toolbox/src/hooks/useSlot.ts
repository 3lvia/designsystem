import React, { useEffect, useRef } from 'react';

/**
 * Get slot from webcomponent and put it in a ref.
 * @param slot Name of slot
 * @param webcomponent
 * @param options.ref The ref to put the slot content in. If no ref is provided, the hook will create one and return it.
 * @param options.callback Called when a slot is found or not, with whether it was found or not as argument.
 * @returns A ref to the element that the slot content is put in. If `options.ref` was provided, the returned `ref` will be the same as the one provided.
 *
 * @example
 * export const Component: FC<Props> = ({content, webcomponent}) => {
 *  const contentRef = useRef<HTMLDivElement>(null);
 *  useSlot('content', webcomponent, {ref: contentRef});
 *  // Without passing a ref, the hook will create one and return it.
 *  const { ref: contentRef } = useSlot('content', webcomponent);
 *  ...
 *  return (<div ref={contentRef}>{content}</div>)
 * }
 * @since 5.7.0
 */
export const useSlot = <
  TValue extends HTMLElement,
  TWebcomponent extends { getSlot: (...args: unknown[]) => Node } = { getSlot: (...args: unknown[]) => Node },
>(
  slot: string,
  webcomponent: TWebcomponent | undefined,
  options?: {
    ref?: React.RefObject<TValue>;
    callback?: (foundSlot: boolean) => void;
  },
): { ref: React.RefObject<TValue> } => {
  const defaultRef = useRef<TValue>(null);
  const ref = options?.ref ?? defaultRef;
  useEffect(() => {
    if (!webcomponent) {
      options?.callback?.(false);
      return;
    }
    // Get slotted items from web component
    if (ref.current && webcomponent.getSlot(slot)) {
      options?.callback?.(true);
      ref.current.innerHTML = '';
      ref.current.appendChild(webcomponent.getSlot(slot));
    } else {
      options?.callback?.(false);
    }
  }, [ref, slot, webcomponent, webcomponent?.getSlot(slot), options?.callback]);
  return { ref };
};
