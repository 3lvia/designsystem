import React, { FC, useEffect, useState } from 'react';

import { SpotlightProps } from './elvia-spotlight.types';
import { SpotlightArea, SpotlightCircle, SpotlightMask, SpotlightRect } from './styledComponents';
import { useLockBodyScroll } from './useLockBodyScroll';

export const Spotlight: FC<SpotlightProps> = ({
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

  // This is a workaround to force the mask to re-render when the window is resized,
  // as the mask size 100% does not update when the window is resized.
  const [backgroundSize, setBackgroundSize] = useState('100%');
  useEffect(() => {
    const handleResize = () => {
      setBackgroundSize((old) => (old === '100%' ? '101%' : '100%'));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        <SpotlightMask maskSize={backgroundSize} mask="url(#hole)" />
      </SpotlightArea>
    </div>
  ) : (
    <div></div>
  );
};

export default Spotlight;
