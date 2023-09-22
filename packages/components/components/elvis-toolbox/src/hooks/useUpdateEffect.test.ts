import { renderHook } from '@testing-library/react';
import { useUpdateEffect } from './useUpdateEffect';

describe('useUpdateEffect custom hook', () => {
  let effectFn: jest.Mock;

  beforeEach(() => {
    effectFn = jest.fn();
  });

  it('should _not_ run the effect on the first render', () => {
    renderHook(() => useUpdateEffect(effectFn));

    expect(effectFn).toHaveBeenCalledTimes(0);
  });

  it('should run the effect on updates after the first render', () => {
    //same as useEffect without dependencies -> should run the effect
    const { rerender } = renderHook(() => useUpdateEffect(effectFn));

    expect(effectFn).toHaveBeenCalledTimes(0);

    rerender();
    expect(effectFn).toHaveBeenCalledTimes(1);

    rerender();
    expect(effectFn).toHaveBeenCalledTimes(2);
  });

  it('should run the effect when the dependencies change', () => {
    const { rerender } = renderHook(({ deps }) => useUpdateEffect(effectFn, deps), {
      initialProps: { deps: [1, 2, 3] },
    });

    expect(effectFn).toHaveBeenCalledTimes(0);

    // rerender with the same dependencies -> should _not_ run the effect
    rerender({ deps: [1, 2, 3] });
    expect(effectFn).toHaveBeenCalledTimes(0);

    //rerender with the different dependencies -> should run the effect
    rerender({ deps: [4, 5, 6] });
    expect(effectFn).toHaveBeenCalledTimes(1);

    rerender({ deps: [7, 8, 9] });
    expect(effectFn).toHaveBeenCalledTimes(2);
  });
});
