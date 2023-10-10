import { renderHook } from '@testing-library/react';
import { useBreakpoint } from './useBreakpoint';

const setUpMockMatchMedia = (
  matches: boolean,
): { addListenerMock: jest.Mock; removeListenerMock: jest.Mock } => {
  const addListenerMock = jest.fn();
  const removeListenerMock = jest.fn();

  global.window.matchMedia = jest.fn().mockImplementation(
    () =>
      ({
        matches: matches,
        addEventListener: addListenerMock,
        removeEventListener: removeListenerMock,
      }) as unknown as MediaQueryList,
  );

  return { addListenerMock, removeListenerMock };
};

describe('useBreakpoint', () => {
  it('should return true if breakpoint matches', () => {
    setUpMockMatchMedia(true);
    const { result } = renderHook(() => useBreakpoint('gt-mobile'));
    expect(result.current).toBe(true);
  });

  it('should return false if breakpoint does not match', () => {
    setUpMockMatchMedia(false);
    const { result } = renderHook(() => useBreakpoint('gt-mobile'));
    expect(result.current).toBe(false);
  });

  it('should listen for match media changes', () => {
    const { addListenerMock } = setUpMockMatchMedia(true);
    renderHook(() => useBreakpoint('gt-mobile'));
    expect(addListenerMock).toHaveBeenCalled();
  });

  it('should unsubscribe for match media changes when destroyed', () => {
    const { removeListenerMock } = setUpMockMatchMedia(true);
    const { unmount } = renderHook(() => useBreakpoint('gt-mobile'));
    unmount();
    expect(removeListenerMock).toHaveBeenCalled();
  });
});
