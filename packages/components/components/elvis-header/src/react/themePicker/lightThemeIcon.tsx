import React from 'react';

export const LightThemeIcon: React.FC = () => {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="56" height="56" rx="8" fill="url(#pattern0)" />
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_4338_1524" transform="scale(0.00446429)" />
        </pattern>
        <image
          id="image0_4338_1524"
          width="224"
          height="224"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};
