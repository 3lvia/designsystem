import * as React from 'react';
import * as StyledDivider from './styledComponents';

export type DividerType = 'simple' | 'title' | 'curved';
export type DividerTypography = 'medium' | 'caps';
export interface DividerProps {
  type?: DividerType;
  title?: string;
  typography?: DividerTypography;
  isInverted?: boolean;
}

export const Divider: React.FC<DividerProps> = ({
  type = 'simple',
  typography = 'medium',
  title = 'Title',
  isInverted = 'false',
}) => {
  return (
    <StyledDivider.DividerArea type={type} isInverted={isInverted}>
      {type === 'title' && (
        <StyledDivider.DividerTitle typography={typography} isInverted={isInverted}>
          {title}
        </StyledDivider.DividerTitle>
      )}
    </StyledDivider.DividerArea>
  );
};

export default Divider;
