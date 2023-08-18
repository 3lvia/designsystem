import styled from 'styled-components';

export const VisuallyHidden = styled.div`
  position: absolute !important;
  overflow: hidden !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  border: 0 !important;
  margin: -1px !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  clip-path: inset(50%) !important;
  white-space: nowrap !important;
`;
