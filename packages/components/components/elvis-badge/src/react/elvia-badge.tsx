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

  //Determine if count is 99+ or not
  const getCount = (count: number | undefined): string | undefined => {
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
      <BadgeCircle count={getCount(count)} badgeColor={badgeColor}>
        {getCount(count)}
      </BadgeCircle>
    </div>
  );
};

export default Badge;
