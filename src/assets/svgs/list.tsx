import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function ListIcon({
  width = 22,
  height = 22,
  color = '#FFC74C',
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" width="5" height="6" fill={color} />
      <rect x="0.5" y="8" width="5" height="6" fill={color} />
      <rect x="0.5" y="16" width="5" height="6" fill={color} />
      <rect x="7.5" width="14" height="6" fill={color} />
      <rect x="7.5" y="8" width="14" height="6" fill={color} />
      <rect x="7.5" y="16" width="14" height="6" fill={color} />
    </svg>
  );
}
