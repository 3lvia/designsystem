import * as React from 'react';
import classnames from 'classnames';
import './style.scss';

export interface DividerProps {
  isCurved?: boolean;
  isInverted?: boolean;
  title?: string;
  titleType?: 'md' | 'caps';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Divider: React.FC<DividerProps> = ({ isCurved, isInverted, title, titleType = 'md' }) => {
  const classes = classnames('ewc-divider', {
    ['ewc-divider--curved']: isCurved,
    ['ewc-divider--inverted']: isInverted,
    ['ewc-divider--title']: title,
    ['ewc-divider-title-md']: titleType === 'md',
  });

  return <div className={classes}>{title && <div className="ewc-divider__title">{title}</div>}</div>;
};

export default Divider;
