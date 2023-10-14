import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
  selected?: boolean;
}

export default function CGConfettiIcon({
  width = 64,
  height = 64,
  color = '#C5C5C5',
  selected = false,
}: Props) {
  return selected ? (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="64" height="64" fill="url(#patternConfetti)" />
      <defs>
        <pattern
          id="patternConfetti"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_297_56715" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_297_56715"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  ) : (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="64" height="64" fill="url(#patternConfetti)" />
      <defs>
        <pattern
          id="patternConfetti"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_297_56708" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_297_56708"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
