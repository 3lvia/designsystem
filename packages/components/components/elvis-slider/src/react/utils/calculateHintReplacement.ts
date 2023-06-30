/**
 * Calculates whether hints should be replaced with the Sliders input based on container width, minimum value and hint widths. (Simple slider only)
 * @returns An object containing the flags indicating whether to replace hint values with input.
 * @description
 * The main rule is to display both hint values and the input in the center if there is enough space for all.
 *
 * If the min value is 0, the left hint value can be replaced with the input  if space is limited.
 * - The input replaces both hint values if there is not enough space (only the input is displayed).
 *
 * If the min value is _not_ 0, the left hint value should be shown if there is enough space.
 * - The input replaces the right hint value first if space becomes limited.
 * - The input replaces both hint values if there is even less space available (only the input is displayed).
 */
export const calculateHintReplacement = ({
  inputLength,
  leftHintWidth,
  rightHintWidth,
  inputContainerWidth,
  min,
  hasHints,
}: {
  inputLength: number;
  leftHintWidth: number;
  rightHintWidth: number;
  inputContainerWidth: number;
  min: number;
  hasHints: boolean;
}) => {
  const inputAndHintsWidth = inputLength + leftHintWidth + rightHintWidth + 16; //8*2 for grid gap
  const isOverflowing = inputAndHintsWidth > inputContainerWidth;

  const newReplaceHintValueWithInput = { left: false, right: false };

  if (isOverflowing && hasHints && min === 0) {
    // Check if we need to replace _left_ hint value with input
    if (inputLength + rightHintWidth + 8 < inputContainerWidth) {
      newReplaceHintValueWithInput.left = true;
    } else {
      newReplaceHintValueWithInput.left = true;
      newReplaceHintValueWithInput.right = true;
    }
  } else if (isOverflowing && hasHints && min !== 0) {
    // Check if we need to replace _right_ hint value with input
    if (inputLength + leftHintWidth + 8 < inputContainerWidth) {
      newReplaceHintValueWithInput.right = true;
    } else {
      newReplaceHintValueWithInput.left = true;
      newReplaceHintValueWithInput.right = true;
    }
  }

  return newReplaceHintValueWithInput;
};
