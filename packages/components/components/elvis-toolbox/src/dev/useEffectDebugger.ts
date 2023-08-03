import React, { useEffect, useRef } from 'react';

const usePrevious = <T>(value: T, initialValue: T) => {
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

/**
 * Debug a `useEffect` hook by logging the dependencies that changed.
 * @param effectHook The effect hook to debug.
 * @param dependencies Array of dependencies for the effect hook.
 * @param dependencyNames Array of the names for the dependencies. If not provided, the index of the dependency will be used.
 *
 * @example
 * useEffectDebugger(
 *  () => {
 *   // do something
 *  },
 *  [dependency1, dependency2],
 *  ['dependency1', 'dependency2'],
 * );
 * @internal Should only be used in development.
 */
export const useEffectDebugger = (
  effectHook: React.EffectCallback,
  dependencies: React.DependencyList,
  dependencyNames: string[] = [],
): void => {
  const previousDeps = usePrevious(dependencies, []);

  const changedDeps = dependencies.reduce((accum, dependency, index) => {
    if (dependency !== previousDeps?.[index]) {
      const keyName = dependencyNames[index] ?? index;
      return {
        ...(accum as any),
        [keyName]: {
          before: previousDeps?.[index],
          after: dependency,
        },
      };
    }

    return accum;
  }, {});

  if (Object.keys(changedDeps as any).length) {
    // eslint-disable-next-line no-console
    console.table(changedDeps);
  }

  useEffect(effectHook, dependencies);
};
