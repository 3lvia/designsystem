import React, { FC } from 'react';

import { SpotlightProps, SpotlightRectangleProps } from './elvia-spotlight.types';
import { SpotlightArea, SpotlightCircle, SpotlightMask, SpotlightRect } from './styledComponents';
import { useLockBodyScroll } from './useLockBodyScroll';

const DEFAULT_RECTANGLE_PROPS = {
  width: 200,
  height: 200,
  borderRadius: 8,
} as const satisfies SpotlightRectangleProps;

export const Spotlight: FC<SpotlightProps> = ({
  position,
  shape = 'circle',
  radius = 200,
  hasLockBodyScroll = true,
  transitionDuration = '350ms',
  rectangleProps = DEFAULT_RECTANGLE_PROPS,
  className,
  inlineStyle,
  ...rest
}) => {
  const hasPosition = position && position.horizontal !== undefined && position.vertical !== undefined;
  const rectangle = { ...DEFAULT_RECTANGLE_PROPS, ...rectangleProps };
  useLockBodyScroll(hasLockBodyScroll);

  return hasPosition ? (
    <div className={className} style={inlineStyle} {...rest}>
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
                width={rectangle.width}
                height={rectangle.height}
                x={position.horizontal}
                y={position.vertical}
                rx={rectangle.borderRadius}
                ry={rectangle.borderRadius}
                fill="black"
              />
            )}
          </mask>
        </defs>
        <SpotlightMask mask="url(#hole)" />
      </SpotlightArea>
    </div>
  ) : (
    <div></div>
  );
};

export default Spotlight;
