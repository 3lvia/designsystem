import React, { useEffect, useRef } from 'react';
import classnames from 'classnames';
import styles from './elvia-badge.module.css';
import { BadgeProps } from './elvia-badge.types';

export const Badge: React.FC<BadgeProps> = ({
  badgeColor = 'green',
  className,
  content,
  count,
  inlineStyle,
  webcomponent,
  ...rest
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!webcomponent) {
      return;
    }
    if (contentRef.current && webcomponent.getSlot('content')) {
      contentRef.current.innerHTML = '';
      contentRef.current.appendChild(webcomponent.getSlot('content'));
    }
  }, [webcomponent]);

  const getCount = (count?: number | string) => {
    if (!count) {
      return;
    }

    if (+count > 99) {
      return '99+';
    }

    return count.toString();
  };

  const badgeCircleClasses = classnames(styles['badge-circle'], {
    [styles['badge--wide']]: getCount(count) === '99+',
    [styles['badge--green']]: badgeColor === 'green',
    [styles['badge--red']]: badgeColor === 'red',
  });

  return (
    <div className={classnames(className, styles['badge-container'])} style={{ ...inlineStyle }} {...rest}>
      <div ref={contentRef}>{content}</div>
      <div className={badgeCircleClasses} role="status">
        {getCount(count)}
      </div>
    </div>
  );
};
