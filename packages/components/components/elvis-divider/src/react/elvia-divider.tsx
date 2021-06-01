import * as React from 'react';
import classnames from 'classnames';
import './style.scss';

export interface DividerProps {
  type?: 'simple' | 'title' | 'curved';
  title?: string;
  typography?: 'medium' | 'caps';
  isInverted?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Divider: React.FC<DividerProps> = ({
  type = 'simple',
  isInverted,
  title = 'Title',
  typography = 'medium',
}) => {
  const classes = classnames('ewc-divider', {
    ['ewc-divider--curved']: type === 'curved',
    ['ewc-divider--title']: type === 'title',
    ['ewc-divider--title-md']: typography === 'medium',
    ['ewc-divider--title-caps']: typography === 'caps',
    ['ewc-divider--inverted']: isInverted,
  });

  return (
    <div className={classes}>{type === 'title' && <div className="ewc-divider__title">{title}</div>}</div>
  );
};

export default Divider;
