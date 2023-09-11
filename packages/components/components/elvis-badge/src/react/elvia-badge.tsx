import React, { useEffect, useRef } from 'react';
import { BadgeCircle, BadgeContainer } from './styledComponents';
import { BadgeProps } from './elvia-badge.types';

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

  return (
    <BadgeContainer className={`${className ?? ''}`} style={{ ...inlineStyle }} {...rest}>
      <div ref={contentRef}>{content}</div>
      <BadgeCircle $count={getCount(count)} $badgeColor={badgeColor} role="status">
        {getCount(count)}
      </BadgeCircle>
    </BadgeContainer>
  );
};

export default Badge;
