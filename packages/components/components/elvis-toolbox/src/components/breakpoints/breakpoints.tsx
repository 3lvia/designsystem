import styled from 'styled-components';
import { device } from '../../breakpoints';

export const GtDesktop = styled.div`
  display: none;

  @media ${device.gtDesktop} {
    display: contents;
  }
`;

export const GtTablet = styled.div`
  display: none;

  @media ${device.gtTablet} {
    display: contents;
  }
`;

export const GtMobile = styled.div`
  display: none;

  @media ${device.gtMobile} {
    display: contents;
  }
`;

export const MobileOnly = styled.div`
  display: contents;

  @media ${device.gtMobile} {
    display: none;
  }
`;
