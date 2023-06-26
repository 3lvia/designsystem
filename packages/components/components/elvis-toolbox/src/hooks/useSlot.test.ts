import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { useSlot } from './useSlot';
import { renderHook } from '@testing-library/react';
import React from 'react';

describe('useSlot', () => {
  const existingSlotName = 'existingSlotName';
  const nonExistingSlotName = 'nonExistingSlotName';
  const defaultDiv = document.createElement('div');
  let reactCallback: jest.Mock;
  beforeEach(() => {
    defaultDiv.innerHTML = 'default div content';
    jest.spyOn(React, 'useRef').mockReturnValue({ current: defaultDiv });
    reactCallback = jest.fn();
  });

  describe('with Web Component', () => {
    const webcomponent = {
      getSlot: jest.fn((slotName: string) => {
        if (slotName !== existingSlotName) {
          return undefined;
        }
        const div = document.createElement('div');
        div.innerHTML = `slot content ${slotName}`;
        return div;
      }),
      addEventListener: jest.fn,
      removeEventListener: jest.fn,
    } as any as ElvisComponentWrapper;

    it('should render hook and update ref content', () => {
      const { result } = renderHook(() => useSlot(existingSlotName, webcomponent));

      const expectedResult = document.createElement('div');
      expectedResult.appendChild(document.createElement('div'));
      expectedResult.children[0].innerHTML = `slot content ${existingSlotName}`;

      expect(result.current.ref.current).toStrictEqual(expectedResult);
    });
    it('should not change ref content when slot does not exist', () => {
      const { result } = renderHook(() => useSlot(nonExistingSlotName, webcomponent));

      expect(result.current.ref.current).toStrictEqual(defaultDiv);
    });
    it('should trigger callback with true when slot exists', () => {
      renderHook(() => useSlot(existingSlotName, webcomponent, { callback: reactCallback }));
      expect(reactCallback).toHaveBeenCalledWith(true);
      expect(reactCallback).toHaveBeenCalledTimes(1);
    });
    it('should trigger callback with false when slot does not exist', () => {
      renderHook(() => useSlot(nonExistingSlotName, webcomponent, { callback: reactCallback }));
      expect(reactCallback).toHaveBeenCalledWith(false);
      expect(reactCallback).toHaveBeenCalledTimes(1);
    });
    it('should return a ref', () => {
      const { result } = renderHook(() => useSlot(nonExistingSlotName, webcomponent));
      expect(result.current.ref).toBeDefined();
      expect(result.current.ref).toHaveProperty('current');
      expect(result.current.ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('with React', () => {
    it('should render hook without changing ref content', () => {
      const { result } = renderHook(() => useSlot(existingSlotName, undefined));

      expect(result.current.ref.current).toStrictEqual(defaultDiv);
    });
    it('should trigger callback with false', () => {
      renderHook(() => useSlot(existingSlotName, undefined, { callback: reactCallback }));
      expect(reactCallback).toHaveBeenCalledWith(false);
      expect(reactCallback).toHaveBeenCalledTimes(1);
    });
    it('should return a ref', () => {
      const { result } = renderHook(() => useSlot(nonExistingSlotName, undefined));
      expect(result.current.ref).toBeDefined();
      expect(result.current.ref).toHaveProperty('current');
      expect(result.current.ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
