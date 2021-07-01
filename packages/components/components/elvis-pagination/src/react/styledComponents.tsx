import styled from 'styled-components';

const ElviaColors = {
    elviaOn: '#ffffff',
    elviaOff: '#000000',
    grey10: '#e9e9e9',
    grey20: '#d3d3d3',
    grey80: '#515151',
    grey70: '#676767',
};

export const PaginatorNumber = styled.button` 
      display: flex;
      justify-content: center;
      align-items: center;
      background: transparent;
      border: ${(props: { selected: boolean }) => (props.selected ? '1px solid #000000' : 'none')};
      border-radius: 50%;
      width: 36px;
      height: 36px;
      margin: 0 4px;
      border-radius: 50%;

      &:hover {
        border: 1px solid #000000
      }

      &:active {
        border: 1px solid #29d305;
      }

`
export const PaginatorDots = styled.div` 
    font-family: Red Hat Text;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0.2px;
    text-align: center;
`