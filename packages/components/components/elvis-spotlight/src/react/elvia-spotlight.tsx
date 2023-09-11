import React, { FC } from 'react';
import { SpotlightArea, SpotlightCircle, SpotlightMask, SpotlightRect } from './styledComponents';

import { useLockBodyScroll } from './useLockBodyScroll';
import { SpotlightProps } from './elvia-spotlight.types';

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
    <div className={className} style={inlineStyle} {...rest}>
      <SpotlightArea>
        <defs>
          <mask id="hole">
            <rect width="100%" height="100%" fill="white" />
            {shape === 'circle' ? (
              <SpotlightCircle
                $transitionDuration={transitionDuration}
                r={radius}
                cx={position.horizontal}
                cy={position.vertical}
                fill="black"
              />
            ) : (
              <SpotlightRect
                $transitionDuration={transitionDuration}
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
        <SpotlightMask mask="url(#hole)" />
      </SpotlightArea>
    </div>
  ) : (
    <div></div>
  );
};

export default Spotlight;
