import React, { CSSProperties, FC } from 'react';
import { SpotlightArea, SpotlightCircle, SpotlightRect } from './styledComponents';
import { useLockBodyScroll } from './useLockBodyScroll';

export type SpotlightShape = 'circle' | 'rectangle';

export interface SpotlightPosition {
  vertical: number;
  horizontal: number;
}

export interface SpotlightRectangleProps {
  width?: number;
  height?: number;
  borderRadius?: number;
}

export interface SpotlightProps {
  position: SpotlightPosition | undefined;
  shape: SpotlightShape;
  radius?: number;
  rectangleProps?: SpotlightRectangleProps;
  hasLockBodyScroll?: boolean;
  transitionDuration?: string;
  className?: string;
  inlineStyle?: CSSProperties;
}

const Spotlight: FC<SpotlightProps> = ({
  position,
  shape = 'circle',
  radius = 200,
  hasLockBodyScroll = true,
  transitionDuration = '350ms',
  rectangleProps = { width: 200, height: 200, borderRadius: 8 },
  className,
  inlineStyle,
  ...rest
}) => {
  const hasPosition = position && position.horizontal !== undefined && position.vertical !== undefined;
  useLockBodyScroll(hasLockBodyScroll);

  return hasPosition ? (
    <div className={`${className ? className : ''}`} style={inlineStyle} {...rest}>
      <SpotlightArea>
        <defs>
          <mask id="hole">
            <rect width="100%" height="100%" fill="white" />
            {shape === 'circle' ? (
              <SpotlightCircle
                transitionDuration={transitionDuration}
                r={radius}
                cx={position.horizontal}
                cy={position.vertical}
                fill="black"
              />
            ) : (
              <SpotlightRect
                transitionDuration={transitionDuration}
                width={rectangleProps.width}
                height={rectangleProps.height}
                x={position.horizontal}
                y={position.vertical}
                rx={rectangleProps.borderRadius}
                ry={rectangleProps.borderRadius}
                fill="black"
              />
            )}
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
