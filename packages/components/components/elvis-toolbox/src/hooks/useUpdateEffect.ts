import { useEffect, useRef } from 'react';

/**
 * Custom hook to track whether it's the first mount of a component with a ref.
 * (Implementation inspired by https://github.com/react-hookz/web)
 *
 * @returns Returns `true` if it's the first mount, `false` otherwise.
 * @example
 * const isFirstMount = useFirstMountState();
 */
const useFirstMountState = (): boolean => {
  const isFirstMount = useRef(true);

  useEffect(() => {
    isFirstMount.current = false;
  }, []);

  return isFirstMount.current;
};

/**
 * Custom hook that skips the initial render, thereafter works like a normal useEffect
 * (Implementation inspired by https://github.com/react-hookz/web).
 *
 * @param effect - The effect to run after the initial render.
 * @param dependencies - An optional array of dependencies.
 * @example
 * useUpdateEffect(() => {
 *   // Your normal useEffect setup logic here
 * }, [dep1, dep2]);
 */
export const useUpdateEffect = (effect: React.EffectCallback, dependencies?: React.DependencyList) => {
  const isFirstMount = useFirstMountState();

  useEffect(() => {
    if (isFirstMount) {
      return;
    } else {
      return effect();
    }
  }, dependencies);
};
