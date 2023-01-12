import React, { FC, useEffect, useState } from 'react';
import { AccordionGroupProps } from './elvia-accordion-group.types';
import { AccordionGroupWrapper, AccordionSlotContent, StyledAccordion } from './styledComponents';

const AccordionGroup: FC<AccordionGroupProps> = ({
  items,
  labels,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) => {
  const [itemsState, setItemsState] = useState(items);

  useEffect(() => {
    setItemsState(items);
  }, [items]);

  useEffect(() => {
    const itemsSlot = webcomponent?.getSlot('items');
    if (itemsSlot) {
      const elements = Array.from(itemsSlot.children).map((item, id) => {
        return (
          <AccordionSlotContent
            dangerouslySetInnerHTML={{ __html: item.innerHTML }}
            key={id}
          ></AccordionSlotContent>
        );
      });

      setItemsState(elements);
    }
  }, [webcomponent]);

  return (
    <AccordionGroupWrapper className={className} style={inlineStyle} {...rest}>
      {itemsState?.map((item, index) => (
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
