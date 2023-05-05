import { useWebComponentState } from './useWebComponentState';
import { renderHook, act } from '@testing-library/react';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';

describe('useWebComponentState', () => {
  describe('with Web Component', () => {
    let webcomponent: ElvisComponentWrapper;
    const stateValue = 'test';

    beforeEach(() => {
      webcomponent = {
        setProps: jest.fn(),
        triggerEvent: jest.fn(),
      } as any as ElvisComponentWrapper;
    });

    it('should render hook', () => {
      const { result } = renderHook(() => useWebComponentState(stateValue, 'state', webcomponent, undefined));

      expect(result.current[0]).toBe(stateValue);
      expect(typeof result.current[0]).toBe(typeof stateValue);
      expect(typeof result.current[1]).toBe('function');
    });
    it('should update value', () => {
      const { result } = renderHook(() => useWebComponentState(stateValue, 'state', webcomponent, undefined));

      act(() => {
        result.current[1]('new value');
      });
      expect(result.current[0]).toBe('new value');
    });
    it('should update value with callback', () => {
      const { result } = renderHook(() => useWebComponentState(stateValue, 'state', webcomponent, undefined));

      act(() => {
        result.current[1]((oldValue) => oldValue + 'updated');
      });
      expect(result.current[0]).toBe(stateValue + 'updated');
    });
    it('should call webcomponent setProps and triggerEvent', () => {
      const { result } = renderHook(() => useWebComponentState(stateValue, 'state', webcomponent, undefined));

      act(() => {
        result.current[1]('new value');
      });
      expect(webcomponent.setProps).toHaveBeenCalledWith({ state: 'new value' }, true);
      expect(webcomponent.triggerEvent).toHaveBeenCalledWith('stateOnChange', 'new value');
    });
  });

  describe('with React', () => {
    let reactCallback: jest.Mock;
    const stateValue = 'test';

    beforeEach(() => {
      reactCallback = jest.fn();
    });

    it('should render hook', () => {
      const { result } = renderHook(() =>
        useWebComponentState(stateValue, 'state', undefined, reactCallback),
      );

      expect(result.current[0]).toBe(stateValue);
      expect(typeof result.current[0]).toBe(typeof stateValue);
      expect(typeof result.current[1]).toBe('function');
    });
    it('should update value', () => {
      const { result } = renderHook(() =>
        useWebComponentState(stateValue, 'state', undefined, reactCallback),
      );

      act(() => {
        result.current[1]('new value');
      });
      expect(result.current[0]).toBe('new value');
    });
    it('should update value with callback', () => {
      const { result } = renderHook(() =>
        useWebComponentState<string>(stateValue, 'state', undefined, reactCallback),
      );

      act(() => {
        result.current[1]((oldValue) => oldValue + 'updated');
      });
      expect(result.current[0]).toBe(stateValue + 'updated');
    });
    it('should call React callback', () => {
      const { result } = renderHook(() =>
        useWebComponentState(stateValue, 'state', undefined, reactCallback),
      );

      act(() => {
        result.current[1]('new value');
      });
      expect(reactCallback).toHaveBeenCalledWith('new value');
    });
    it('should work without any callback', () => {
      const { result } = renderHook(() => useWebComponentState(stateValue, 'state', undefined, undefined));

      act(() => {
        result.current[1]('new value');
      });
      expect(result.current[0]).toBe('new value');
    });
  });
});
