import { BaseProps } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

export interface CarouselItem {
  heading?: JSX.Element | string;
  item: JSX.Element | string;
}
export type SlideDirection = 'left' | 'right';
export type AccordionType = 'linear' | 'loop';

export interface CarouselProps extends ComponentPropsWithoutRef<'section'>, BaseProps {
  items: CarouselItem[] | number;
  onFinish?: () => void;
  hasConfirmationCheckmark?: boolean;
  value?: number;
  valueOnChange?: (value: number) => void;
  hasAnimation?: boolean;
  type?: AccordionType;
}
