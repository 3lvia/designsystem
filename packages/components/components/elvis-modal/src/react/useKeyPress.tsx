import { useEffect, useState } from 'react';

const KEYDOWN = 'keydown';
const KEYUP = 'keyup';

type HandledEvents = [typeof KEYDOWN, typeof KEYUP];
type HandledEventsType = HandledEvents[number];
type PossibleEvent = {
  [Type in HandledEventsType]: HTMLElementEventMap[Type];
}[HandledEventsType];
type Handler = (event: PossibleEvent) => void;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useKeyPress(targetKey: string, handler?: Handler | null) {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler(event: KeyboardEvent) {
    if (event.key === targetKey) {
      setKeyPressed(true);
      if (!handler) {
        return;
      }
      handler(event);
    }
  }

  const upHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey, handler]);

  return keyPressed;
}
