import { Accordion } from '@elvia/elvis-accordion/react';
import styled from 'styled-components';

export const AccordionGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 16px;
`;

export const StyledAccordion = styled(Accordion)`
  padding-bottom: 16px;
  border-bottom: 1px solid #e9e9e9;
`;

export const AccordionSlotContent = styled.div`
  display: contents;
`;
