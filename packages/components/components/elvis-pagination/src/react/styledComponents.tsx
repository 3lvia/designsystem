import styled from 'styled-components';

const ElviaColors = {
  elviaOn: '#ffffff',
  elviaOff: '#000000',
  grey10: '#e9e9e9',
  grey20: '#d3d3d3',
  grey80: '#515151',
  grey70: '#676767',
};

export const Pagination = styled.div` 
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 275px;
  user-select: none;

  @media (max-width: 767px) {
    flex-direction: column-reverse;
    height: auto;
    justify-content: center;
    align-items: start;
  }
`;
export const InfoContainer = styled.div` 
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    margin-top: 24px;
  }
`;

export const InfoText = styled.div` 
  font-family: 'Red Hat Text';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
`;
export const InfoDropdown = styled.div` 
  width: 72px;
  margin: 0 8px;
`
export const InfoAmount = styled.div` 
  font-family: 'Red Hat Text';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
  white-space: nowrap;
  // adjust later for mobile
  margin-right: 24px;
`
export const SelectorArea = styled.div` 
  display: flex;
  align-items: center;
  width: 100%;
  user-select: none;
`

export const SelectorArrowBtn = styled.button` 
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  visibility: ${(props: { visible: boolean }) => (props.visible ? 'visible' : 'hidden')};

  &:hover {
    border: 1px solid black;
  }
  &:active {
    border: 1px solid #29d305;
  }
`
export const SelectorArrowLeft = styled.div` 
  height: 16px;
  width: 16px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.22 11.453a.763.763 0 00-.162.243l.161-.243zm.005-.006L10.948.724a.766.766 0 011.083 1.084l-9.416 9.415h20.619a.766.766 0 110 1.532H2.615l9.416 9.416a.766.766 0 11-1.083 1.083L.224 12.531a.764.764 0 01-.166-.835' fill='black'/%3e%3c/svg%3e");
`


export const SelectorRighArrow = styled.div`
  height: 16px;
  width: 16px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 24 24' aria-hidden='true' width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M23.693 12.213a.748.748 0 00-.163-.243l-10.5-10.5a.75.75 0 10-1.06 1.06l9.22 9.22H1a.75.75 0 000 1.5h20.19l-9.22 9.22a.75.75 0 101.06 1.06l10.5-10.5a.747.747 0 00.163-.817z' fill='black'/%3e%3c/svg%3e");
`



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
      margin-left: ${(props: { isFirst: boolean }) => (props.isFirst ? '0px' : '4px')};
      margin-right: ${(props: { isLast: boolean }) => (props.isLast ? '0px' : '4px')};
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