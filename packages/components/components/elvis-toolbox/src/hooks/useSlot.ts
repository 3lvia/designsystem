import React, { useEffect, useRef } from 'react';

/**
 * Get slot from webcomponent and put it in a ref.
 * @param slot Name of slot
 * @param webcomponent
 * @param options.ref The ref to put the slot content in. If no ref is provided, the hook will create one and return it.
 * @param options.callback Called when a slot is found or not, with whether it was found or not as argument.
 * @param options.useEffectDependencies Extra dependencies for the useEffect hook.
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
  TRefElement extends HTMLElement,
  TWebcomponent extends { getSlot: (slotName: string) => Element } & HTMLElement = {
    getSlot: (slotName: string) => Element;
  } & HTMLElement,
>(
  slot: string,
  webcomponent: TWebcomponent | undefined,
  options?: {
    ref?: React.RefObject<TRefElement>;
    /**
     * Called when a slot is found or not, with whether it was found or not as argument.
     * Remember to wrap the callback in a `useCallback` to avoid infinite loops.
     */
    callback?: (foundSlot: boolean) => void;
    /**
     * Extra dependencies for the `useEffect` hook.
     * Remember to wrap in a `useMemo` to avoid infinite loops.
     */
    useEffectDependencies?: React.DependencyList;
  },
): { ref: React.RefObject<TRefElement> } => {
  const defaultRef = useRef<TRefElement>(null);
  const ref = options?.ref ?? defaultRef;
  useEffect(() => {
    const updateSlotContent = () => {
      if (!webcomponent || !ref.current) {
        options?.callback?.(false);
        return;
      }

      const slotContent = webcomponent.getSlot(slot);
      if (!slotContent) {
        options?.callback?.(false);
        return;
      }
      ref.current.innerHTML = ''; // TODO: Remove even if no slot content, if not set as a prop?
      options?.callback?.(true);
      ref.current.appendChild(slotContent);
    };
    updateSlotContent();

    webcomponent?.addEventListener('elvisSlotChange', updateSlotContent);
    () => {
      webcomponent?.removeEventListener('elvisSlotChange', updateSlotContent);
    };
  }, [ref, slot, webcomponent, options?.callback, options?.useEffectDependencies]);
  return { ref };
};
