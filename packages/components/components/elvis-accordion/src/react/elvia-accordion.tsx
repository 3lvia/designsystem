import React, { FC, useState } from 'react';
import './style.scss';
// import toolbox from '@elvia/elvis-toolbox';
import styled from 'styled-components';

export interface AccordionProps {
  label: string;
  position: string;
  content: string;
}

const ElviaColors = {
  elviaCharge: '#29d305',
  elviaOn: '#ffffff',
  elviaOff: '#000000',
};

const AccordionArea = styled.div`
  display: inline-flex;
  width: 100%;
  flex-direction: column;
`;

const AccordionButtonArea = styled.div`
  display: inline-flex;
  justify-content: ${(props) => props.position};
  width: 100%;
  flex-direction: row;
`;

const AccordionLabel = styled.label`
  display: flex;
  font-family: 'Red Hat Display', Verdana, sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  text-align: left;

  padding-right: 8px;
  max-width: 80%;
`;

const AccordionButton = styled.button`
  border: none;
  border-radius: 50%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${(props: { isContentOpen: boolean }) =>
    props.isContentOpen
      ? `url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.187 9.106a1.149 1.149 0 011.626 0l4.237 4.237a.853.853 0 11-1.207 1.207L12 10.707 8.157 14.55a.853.853 0 01-1.207-1.207l4.237-4.237z' fill='black'/%3e%3c/svg%3e")`
      : `url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.813 15.393a1.149 1.149 0 01-1.626 0L6.95 11.157A.853.853 0 118.157 9.95L12 13.793l3.843-3.843a.853.853 0 011.207 1.207l-4.237 4.236z' fill='black'/%3e%3c/svg%3e")`};
  background-color: ${ElviaColors.elviaOn};
  display: inline-block;
  height: 24px;
  width: 24px;
  outline: none;

  &:hover {
    background-image: ${(props: { isContentOpen: boolean }) =>
      props.isContentOpen
        ? `url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M0 12c0 6.617 5.383 12 12 12s12-5.383 12-12S18.617 0 12 0 0 5.383 0 12z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M11.187 9.106a1.149 1.149 0 011.626 0l4.237 4.237a.853.853 0 11-1.207 1.207L12 10.707 8.157 14.55a.853.853 0 01-1.207-1.207l4.237-4.237z' fill='black'/%3e%3c/svg%3e")`
        : `url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12z' fill='%2329D305'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.813 15.393a1.149 1.149 0 01-1.626 0L6.95 11.157A.853.853 0 118.157 9.95L12 13.793l3.843-3.843a.853.853 0 011.207 1.207l-4.237 4.236z' fill='black'/%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.813 15.393a1.149 1.149 0 01-1.626 0L6.95 11.157A.853.853 0 118.157 9.95L12 13.793l3.843-3.843a.853.853 0 011.207 1.207l-4.237 4.236z' fill='black'/%3e%3c/svg%3e")`};
  }
`;

const AccordionContent = styled.div`
  display: flex;
  width: 100%;
  // open
  padding-top: ${(props) => (props.isContentOpen ? '24px' : '0')};
  pointer-events: ${(props) => (props.isContentOpen ? 'auto' : 'none')};
  max-height: ${(props) => (props.isContentOpen ? '10000px' : '0')};
  opacity: ${(props) => (props.isContentOpen ? '1' : '0')};

  transition: all 0.25s cubic-bezier(0.4, 0.01, 0.12, 0.32), opacity 0.3s cubic-bezier(0, 0.3, 0.83, 0.97);
`;

const Accordion: FC<AccordionProps> = ({ label, position = 'center', content }) => {
  const [contentOpen, setContentOpen] = useState(false);

  return (
    <AccordionArea>
      <AccordionButtonArea position={position}>
        <AccordionLabel>{label}</AccordionLabel>
        <AccordionButton
          isContentOpen={contentOpen}
          onClick={() => setContentOpen((contentOpen) => !contentOpen)}
        ></AccordionButton>
      </AccordionButtonArea>
      <AccordionContent isContentOpen={contentOpen}>{content}</AccordionContent>
    </AccordionArea>
  );
};

export default Accordion;
