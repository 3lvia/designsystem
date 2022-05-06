import React, { CSSProperties, FC } from 'react';
import { SpotlightArea, SpotlightCircle } from './styledComponents';
import { useLockBodyScroll } from './useLockBodyScroll';

export interface SpotlightPosition {
  vertical: number | undefined;
  horizontal: number | undefined;
}
export interface SpotlightProps {
  position: SpotlightPosition | undefined;
  radius?: number;
  hasLockBodyScroll?: boolean;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
}

const Spotlight: FC<SpotlightProps> = ({
  position,
  radius = 200,
  hasLockBodyScroll = true,
  className,
  inlineStyle,
  ...rest
}) => {
  const hasPosition = position && position.horizontal && position.vertical;
  useLockBodyScroll(hasLockBodyScroll);

  return hasPosition ? (
    <div className={`${className ? className : ''}`} style={inlineStyle} {...rest}>
      <SpotlightArea>
        <defs>
          <mask id="hole">
            <rect width="100%" height="100%" fill="white" />
            <SpotlightCircle r={radius} cx={position.horizontal} cy={position.vertical} fill="black" />
          </mask>
        </defs>
        <rect fill="rgba(0,0,0,0.25)" width="100%" height="100%" mask="url(#hole)" />
      </SpotlightArea>
    </div>
  ) : (
    <div></div>
  );
};

export default Spotlight;
