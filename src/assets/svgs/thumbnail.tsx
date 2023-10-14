import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function ThumbnailIcon({
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
      <rect width="6" height="6" fill={color} fillOpacity="0.8" />
      <rect x="8" width="6" height="6" fill={color} fillOpacity="0.8" />
      <rect x="16" width="6" height="6" fill={color} fillOpacity="0.8" />
      <rect y="8" width="6" height="6" fill={color} fillOpacity="0.8" />
      <rect x="8" y="8" width="6" height="6" fill={color} fillOpacity="0.8" />
      <rect x="16" y="8" width="6" height="6" fill={color} fillOpacity="0.8" />
      <rect y="16" width="6" height="6" fill={color} fillOpacity="0.8" />
      <rect x="8" y="16" width="6" height="6" fill={color} fillOpacity="0.8" />
      <rect x="16" y="16" width="6" height="6" fill={color} fillOpacity="0.8" />
    </svg>
  );
}
