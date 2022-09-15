import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import React, { CSSProperties, useEffect, useRef } from 'react';
import { BadgeCircle } from './styledComponents';
import { BadgeColor } from './elvia-badge.types';

export interface BadgeProps {
  badgeColor?: BadgeColor;
  className?: string;
  content?: JSX.Element;
  count?: number;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}

const Badge: React.FC<BadgeProps> = ({
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
    // Web component - Placing slots at the right place
    if (!webcomponent) {
      return;
    }
    // Get slotted items from web component
    if (contentRef.current && webcomponent.getSlot('content')) {
      contentRef.current.innerHTML = '';
      contentRef.current.appendChild(webcomponent.getSlot('content'));
    }
  }, [webcomponent]);

  /**
   * If the count is undefined return undefined. If the count is greater than 99,
   * return '99+'. Otherwise, return the count as a string.
   * @param {number | undefined} count - The number of notifications.
   * @returns The count is being returned as a string.
   */
  const getCount = (count: number | undefined) => {
    if (!count) {
      return;
    }
    if (count > 99) {
      return '99+';
    }
    return count.toString();
  };

  return (
    <div
      className={`${className ? className : ''}`}
      style={{
        width:
          'fit-content' /* This should possibly be changed if the component is to become more responsive in the future */,
        position: 'relative',
        ...inlineStyle,
      }}
      {...rest}
    >
      <div ref={contentRef ?? undefined}>{content}</div>
      <BadgeCircle count={getCount(count)} badgeColor={badgeColor} role="status" data-testid="badge-circle">
        {getCount(count)}
      </BadgeCircle>
    </div>
  );
};

export default Badge;
