import { useSlot } from '@elvia/elvis-toolbox';
import classnames from 'classnames';
import React from 'react';

import styles from './elvia-badge.module.scss';
import { BadgeProps } from './elvia-badge.types';

export const Badge: React.FC<BadgeProps> = ({
  badgeColor = 'green',
  className,
  content,
  count,
  inlineStyle,
  isHidden = false,
  webcomponent,
  ...rest
}) => {
  const { ref: contentRef } = useSlot<HTMLDivElement>('content', webcomponent);

  const getCount = (count?: number | string) => {
    if (!count) {
      return;
    }

    if (+count > 99) {
      return '99+';
    }

    return count.toString();
  };

  const badgeCircleClasses = classnames(styles['badge-circle'], styles[`badge--${badgeColor}`], {
    [styles['badge--wide']]: getCount(count) === '99+',
    [styles['badge--hidden']]: isHidden,
  });

  return (
    <div className={classnames(className, styles['badge-container'])} style={{ ...inlineStyle }} {...rest}>
      <div ref={contentRef}>{content}</div>
      <div className={badgeCircleClasses} role="status" aria-hidden={isHidden}>
        {getCount(count)}
      </div>
    </div>
  );
};
