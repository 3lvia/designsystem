import { useEffect, useState } from 'react';

type InputMode = 'mouse' | 'keyboard' | 'touch';

/**
 * Detects whether mouse or keyboard is being used for interaction.
 *
 * @param element An optional element to observe. If not provided, `document.body` is being observed.
 *
 * @example
 * export const Component: FC<Props> = () => {
 *   const { inputMode, isMouse } = useInputModeDetection();
 *   ...
 * }
 */
export const useInputModeDetection = (
  element?: React.RefObject<HTMLElement>,
): { inputMode: InputMode; isMouse: boolean } => {
  const [inputMode, setInputMode] = useState<InputMode>('mouse');

  useEffect(() => {
    const setIsKeyboard = () => setInputMode('keyboard');
    const setIsMouse = () => setInputMode('mouse');
    const setIsTouch = () => setInputMode('touch');

    const elementToObserve = element?.current ?? document.body;
    elementToObserve.addEventListener('click', setIsMouse);
    elementToObserve.addEventListener('keydown', setIsKeyboard);
    elementToObserve.addEventListener('touchstart', setIsTouch);

    return () => {
      elementToObserve.removeEventListener('click', setIsMouse);
      elementToObserve.removeEventListener('keydown', setIsKeyboard);
      elementToObserve.removeEventListener('touchstart', setIsTouch);
    };
  }, [element]);

  return { inputMode, isMouse: inputMode === 'mouse' };
};
