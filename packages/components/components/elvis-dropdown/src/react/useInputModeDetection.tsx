import { useEffect, useState } from 'react';

type InputMode = 'mouse' | 'keyboard';

/**
 * Detects whether mouse or keyboard is being used for interaction.
 *
 * @param element An optional element to observe. If not provided `document` is being observed.
 *
 * @example
 * export const Component: FC<Props> = () => {
 *   const { inputMode } = useInputModeDetection();
 *   ...
 * }
 */
export const useInputModeDetection = (
  element?: React.RefObject<HTMLElement>,
): { inputMode: InputMode; isMouse: boolean } => {
  const [inputMode, setInputMode] = useState<InputMode>('mouse');
  const [isMouse, setIsMouse] = useState(inputMode === 'mouse');

  useEffect(() => {
    const setIsKeyboard = () => setInputMode('keyboard');
    const setIsMouse = () => setInputMode('mouse');

    const elementToObserve = element?.current ?? document.body;
    elementToObserve.addEventListener('mousemove', setIsMouse);
    elementToObserve.addEventListener('keydown', setIsKeyboard);

    return () => {
      elementToObserve.removeEventListener('mousemove', setIsMouse);
      elementToObserve.removeEventListener('keydown', setIsKeyboard);
    };
  }, [element]);

  useEffect(() => {
    setIsMouse(inputMode === 'mouse');
  }, [inputMode]);

  return { inputMode, isMouse };
};
