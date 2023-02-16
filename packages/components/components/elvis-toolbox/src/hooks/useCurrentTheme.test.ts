import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useCurrentTheme } from './useCurrentTheme';

describe('useCurrentTheme', () => {
  let divElement: HTMLDivElement;
  beforeEach(() => {
    document.body.classList.remove('e-theme-light', 'e-theme-dark');
    divElement = document.createElement('div');
    document.body.appendChild(divElement);
  });
  afterEach(() => {
    document.body.classList.remove('e-theme-light', 'e-theme-dark');
    divElement.remove();
  });

  it('should have default light theme', () => {
    const { result } = renderHook(() => {
      const elementRef = useRef(divElement);
      return useCurrentTheme(elementRef);
    });

    expect(result.current.currentTheme).toBe('light');
    expect(result.current.themeClass).toBe('e-theme-light');
  });
  it('should have light theme when parent has e-theme-light', () => {
    divElement.classList.add('e-theme-light');
    const { result } = renderHook(() => {
      const elementRef = useRef(divElement);
      return useCurrentTheme(elementRef);
    });

    expect(result.current.currentTheme).toBe('light');
    expect(result.current.themeClass).toBe('e-theme-light');
  });
  it('should have dark theme when parent has e-theme-dark', () => {
    divElement.classList.add('e-theme-dark');
    const { result } = renderHook(() => {
      const elementRef = useRef(divElement);
      return useCurrentTheme(elementRef);
    });

    expect(result.current.currentTheme).toBe('dark');
    expect(result.current.themeClass).toBe('e-theme-dark');
  });
  it('should get theme from document when parent has no theme class', () => {
    document.body.classList.add('e-theme-dark');
    const { result } = renderHook(() => {
      const elementRef = useRef(divElement);
      return useCurrentTheme(elementRef);
    });

    expect(result.current.currentTheme).toBe('dark');
    expect(result.current.themeClass).toBe('e-theme-dark');
  });
});
