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
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number>();
  const [itemsState, setItemsState] = useState(items);

  useEffect(() => {
    setItemsState(items);
  }, [items]);

  useEffect(() => {
    const itemsSlot = webcomponent?.getSlot('items');
    if (itemsSlot) {
      const newItems = Array.from(itemsSlot.children).map((item, id) => (
        <AccordionSlotContent dangerouslySetInnerHTML={{ __html: item.innerHTML }} key={id} />
      ));
      setItemsState(newItems);
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
          onOpen={() => setOpenAccordionIndex(index)}
          isOpen={openAccordionIndex === index}
        />
      ))}
    </AccordionGroupWrapper>
  );
};

export default AccordionGroup;
