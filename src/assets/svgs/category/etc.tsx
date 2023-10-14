import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
  selected?: boolean;
}

export default function CGEtcIcon({
  width = 60,
  height = 60,
  color = '#C5C5C5',
  selected = false,
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="6" y="25" width="10" height="10" rx="5" fill={color} />
      <rect x="25" y="25" width="10" height="10" rx="5" fill={color} />
      <rect x="44" y="25" width="10" height="10" rx="5" fill={color} />
    </svg>
  );
}
