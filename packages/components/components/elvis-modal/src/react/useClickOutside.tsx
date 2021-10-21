import { useEffect } from 'react';

const MOUSEDOWN = 'mousedown';
const TOUCHSTART = 'touchstart';

type HandledEvents = [typeof MOUSEDOWN, typeof TOUCHSTART];
type HandledEventsType = HandledEvents[number];
type PossibleEvent = {
  [Type in HandledEventsType]: HTMLElementEventMap[Type];
}[HandledEventsType];
type Handler = (event: PossibleEvent) => void;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useClickOutside(ref: React.RefObject<HTMLElement>, handler: Handler | null) {
  useEffect(() => {
    if (!handler) {
      return;
    }

    const listener = (event: PossibleEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
}
