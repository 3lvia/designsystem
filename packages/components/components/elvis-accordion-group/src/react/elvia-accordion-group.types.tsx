import { BaseProps } from '@elvia/elvis-toolbox';

export interface AccordionLabel {
  open: string;
  close: string;
}

export interface AccordionGroupProps extends BaseProps {
  items?: (string | JSX.Element)[];
  labels?: AccordionLabel[];
}
