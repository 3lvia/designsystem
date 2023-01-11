import React, { FC } from 'react';
import { AccordionGroupProps } from './elvia-accordion-group.types';
import { AccordionGroupWrapper, StyledAccordion } from './styledComponents';

const AccordionGroup: FC<AccordionGroupProps> = ({
  items,
  labels,
  className,
  inlineStyle,
  // webcomponent,
  ...rest
}) => {
  // TODO: Add slots

  return (
    <AccordionGroupWrapper className={className} style={inlineStyle} {...rest}>
      {items?.map((item, index) => (
        <StyledAccordion
          spacingAboveContent="8px"
          typography="text-lg-strong"
          openLabel={labels?.[index]?.open ?? `Åpne`}
          closeLabel={labels?.[index]?.close ?? `Lukk`}
          isFullWidth
          content={item}
          key={index}
        />
      ))}
    </AccordionGroupWrapper>
  );
};

export default AccordionGroup;
