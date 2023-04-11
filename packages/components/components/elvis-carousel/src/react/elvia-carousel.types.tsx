import { BaseProps } from '@elvia/elvis-toolbox';

export interface CarouselItem {
  /**
   * @deprecated Deprecated in version 2.0.0. Use `heading` instead.
   */
  title?: JSX.Element | string | HTMLElement;
  /**
   * @deprecated Deprecated in version 2.0.0. Use `item` instead.
   */
  element?: JSX.Element | string | HTMLElement;
  heading?: JSX.Element | string;
  item: JSX.Element | string;
}
export type SlideDirection = 'left' | 'right';

export interface CarouselProps extends BaseProps {
  items: CarouselItem[] | number;
  /**
   * @deprecated Deprecated in version 2.0.0. Use `items` instead.
   */
  elements?: CarouselItem[] | number;
  /**
   * @deprecated Deprecated in version 2.0.0.
   * Use the `type` prop instead.
   */
  hideArrows?: boolean;
  /**
   * @deprecated Deprecated in version 2.3.1.
   * Use the `type` prop instead.
   */
  loop?: boolean;
  onFinish?: () => void;
  /**
   *  @deprecated Deprecated in version 2.0.0. Use `onFinish` instead.
   */
  onHide?: () => void;
  /**
   *  @deprecated Deprecated in version 2.0.0. Use `hasConfirmationCheckmark` instead.
   */
  useOnboardingCheckmark?: boolean;
  hasConfirmationCheckmark?: boolean;
  value?: number;
  valueOnChange?: (value: number) => void;
  hasAnimation?: boolean;
  type?: 'normal | loop';
}
