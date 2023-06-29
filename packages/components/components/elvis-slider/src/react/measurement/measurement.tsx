import React, { useEffect } from 'react';
import {
  FormFieldContainer,
  FormFieldInputContainer,
  FormFieldInputSuffixText,
  FormFieldSizes,
} from '@elvia/elvis-toolbox';
import { FormFieldInput } from '../styledComponents';
import { useContentRectWidth } from '../utils/useContentRectWidth';
import { BoundaryWidthMeasurement } from './measurementStyles';

interface Props {
  max: number;
  min: number;
  size: FormFieldSizes;
  unit?: string;
  setWidth: (width: number) => void;
}

/**
 * The `Measurement` component is used to measure the optimal width for the input based on the `min` and `max` vales of the slider.
 * It is visually hidden and only used to measure the width of the input.
 */
export const Measurement: React.FC<Props> = ({ min, max, size, unit, setWidth }) => {
  const [minValueRectWidth, minValueRectRef] = useContentRectWidth<HTMLSpanElement>();
  const [maxValueRectWidth, maxValueRectRef] = useContentRectWidth<HTMLSpanElement>();

  const [measurementInputRectWidth, measurementInputRectWidthRef] = useContentRectWidth<HTMLDivElement>();

  const inputMinWidth = Math.max(minValueRectWidth, maxValueRectWidth);

  useEffect(() => {
    setWidth(measurementInputRectWidth);
  }, [measurementInputRectWidth]);

  return (
    <>
      <BoundaryWidthMeasurement ref={minValueRectRef} $size={size} role="none" aria-hidden="true">
        {min}
      </BoundaryWidthMeasurement>
      <BoundaryWidthMeasurement ref={maxValueRectRef} $size={size} role="none" aria-hidden="true">
        {max}
      </BoundaryWidthMeasurement>
      <FormFieldContainer
        as="div"
        size={size}
        style={{
          height: 0,
          margin: 0,
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          whiteSpace: 'pre',
          visibility: 'hidden',
        }}
        aria-hidden="true"
        role="none"
        ref={measurementInputRectWidthRef}
      >
        <FormFieldInputContainer>
          <FormFieldInput disabled $width={inputMinWidth} />
          {unit && <FormFieldInputSuffixText>{unit}</FormFieldInputSuffixText>}
        </FormFieldInputContainer>
      </FormFieldContainer>
    </>
  );
};
