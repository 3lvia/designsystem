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
  TWebcomponent extends HTMLElement & {
    getSlot: (slotName: string) => Element;
    storeAllSlotsEvent?: string;
  } = HTMLElement & {
    getSlot: (slotName: string) => Element;
    storeAllSlotsEvent?: string;
  },
>(
  slot: string,
  webcomponent?: TWebcomponent,
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
    const updateSlot = () => {
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
    };

    updateSlot();
    const storeAllSlotsEvent = webcomponent?.storeAllSlotsEvent;
    if (!webcomponent || !storeAllSlotsEvent) {
      return;
    }
    webcomponent.addEventListener(storeAllSlotsEvent, updateSlot);
    return () => {
      webcomponent.removeEventListener(storeAllSlotsEvent, updateSlot);
    };
  }, [
    ref,
    slot,
    webcomponent,
    webcomponent?.getSlot(slot),
    options?.callback,
    options?.useEffectDependencies,
  ]);
  return { ref };
};
