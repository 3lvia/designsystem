import React, { CSSProperties, FC } from 'react';
import { SpotlightArea, SpotlightCircle } from './styledComponents';

export interface SpotlightPosition {
  verticalPosition: number;
  horizontalPosition: number;
}
export interface SpotlightProps {
  position: SpotlightPosition;
  radius?: number;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
}

const Spotlight: FC<SpotlightProps> = ({ position, radius = 200, className, inlineStyle }) => {
  return (
    <div className={`${className ? className : ''}`} style={inlineStyle}>
      <SpotlightArea>
        <defs>
          <mask id="hole">
            <rect width="100%" height="100%" fill="white" />
            <SpotlightCircle
              r={radius}
              cx={position.horizontalPosition}
              cy={position.verticalPosition}
              fill="black"
            />
          </mask>
        </defs>
        <rect fill="rgba(0,0,0,0.25)" width="100%" height="100%" mask="url(#hole)" />
      </SpotlightArea>
    </div>
  );
};

export default Spotlight;
