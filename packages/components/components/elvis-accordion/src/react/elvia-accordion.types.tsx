export type AccordionLabelPosition = 'left' | 'center' | 'right';
export type AccordionSize = 'small' | 'medium' | 'large';
export type AccordionType = 'normal' | 'overflow';

export type AccordionButtonArea = {
  labelPosition: AccordionLabelPosition;
  type: AccordionType;
};
export type AccordionButton = {
  size: AccordionSize;
  openLabel: string;
  closeLabel: string;
  isContentOpen: boolean;
  onClick: any;
};
export type AccordionContent = {
  isContentOpen: boolean;
  type: AccordionType;
  size: AccordionSize;
};
