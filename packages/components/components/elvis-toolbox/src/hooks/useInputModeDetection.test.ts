import { renderHook } from '@testing-library/react';
import { useInputModeDetection } from './useInputModeDetection';
import userEvent from '@testing-library/user-event';

describe('useInputModeDetection', () => {
  it('should set mouse as input mode when document is clicked', async () => {
    const user = userEvent.setup();
    const { result } = renderHook(() => useInputModeDetection());

    await user.click(document.body);

    expect(result.current.inputMode).toBe('mouse');
  });

  it('should set keyboard as input mode when document is typed in', async () => {
    const user = userEvent.setup();
    const { result } = renderHook(() => useInputModeDetection());

    await user.keyboard('{Tab}');

    expect(result.current.inputMode).toBe('keyboard');
  });

  it('should not set mouse as input mode when the mouse moves in the document', async () => {
    const user = userEvent.setup();
    const { result } = renderHook(() => useInputModeDetection());

    await user.keyboard('{Tab}');

    expect(result.current.inputMode).toBe('keyboard');

    await user.pointer({ coords: { x: 10, y: 10 } });

    expect(result.current.inputMode).toBe('keyboard');
  });
});
