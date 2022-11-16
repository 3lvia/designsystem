import { useWebComponentState } from './useWebComponentState';
import { renderHook, act } from '@testing-library/react-hooks';

describe('useWebComponentState', () => {
  describe('with Web Component', () => {
    it('should render hook', () => {
      const webcomponent = {
        setProps: jest.fn(),
        triggerEvent: jest.fn(),
      };
      const value = 'test';
      const { result } = renderHook(() => useWebComponentState(value, 'state', webcomponent, undefined));

      expect(result.current[0]).toBe(value);
      expect(typeof result.current[0]).toBe(typeof value);
      expect(typeof result.current[1]).toBe('function');
    });
    it('should update value', () => {
      const webcomponent = {
        setProps: jest.fn(),
        triggerEvent: jest.fn(),
      };
      const value = 'test';
      const { result } = renderHook(() => useWebComponentState(value, 'state', webcomponent, undefined));

      act(() => {
        result.current[1]('new value');
      });
      expect(result.current[0]).toBe('new value');
    });
    it('should update value with callback', () => {
      const webcomponent = {
        setProps: jest.fn(),
        triggerEvent: jest.fn(),
      };
      const value = 'test';
      const { result } = renderHook(() => useWebComponentState(value, 'state', webcomponent, undefined));

      act(() => {
        result.current[1]((oldValue) => oldValue + 'updated');
      });
      expect(result.current[0]).toBe(value + 'updated');
    });
    it('should call webcomponent setProps and triggerEvent', () => {
      const webcomponent = {
        setProps: jest.fn(),
        triggerEvent: jest.fn(),
      };
      const value = 'test';
      const { result } = renderHook(() => useWebComponentState(value, 'state', webcomponent, undefined));

      act(() => {
        result.current[1]('new value');
      });
      expect(webcomponent.setProps).toHaveBeenCalledWith({ state: 'new value' }, true);
      expect(webcomponent.triggerEvent).toHaveBeenCalledWith('stateOnChange', 'new value');
    });
  });
  describe('with React', () => {
    it('should render hook', () => {
      const reactCallback = jest.fn();
      const value = 'test';
      const { result } = renderHook(() => useWebComponentState(value, 'state', undefined, reactCallback));

      expect(result.current[0]).toBe(value);
      expect(typeof result.current[0]).toBe(typeof value);
      expect(typeof result.current[1]).toBe('function');
    });
    it('should update value', () => {
      const reactCallback = jest.fn();
      const value = 'test';
      const { result } = renderHook(() => useWebComponentState(value, 'state', undefined, reactCallback));

      act(() => {
        result.current[1]('new value');
      });
      expect(result.current[0]).toBe('new value');
    });
    it('should update value with callback', () => {
      const reactCallback = jest.fn();
      const value = 'test';
      const { result } = renderHook(() =>
        useWebComponentState<string, any>(value, 'state', undefined, reactCallback),
      );

      act(() => {
        result.current[1]((oldValue) => oldValue + 'updated');
      });
      expect(result.current[0]).toBe(value + 'updated');
    });
    it('should call React callback', () => {
      const reactCallback = jest.fn();
      const value = 'test';
      const { result } = renderHook(() => useWebComponentState(value, 'state', undefined, reactCallback));

      act(() => {
        result.current[1]('new value');
      });
      expect(reactCallback).toHaveBeenCalledWith('new value');
    });
    it('should work without any callback', () => {
      const value = 'test';
      const { result } = renderHook(() => useWebComponentState(value, 'state', undefined, undefined));

      act(() => {
        result.current[1]('new value');
      });
      expect(result.current[0]).toBe('new value');
    });
  });
});
