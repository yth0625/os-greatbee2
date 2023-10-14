import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function RadioCircleIcon({
  width = 24,
  height = 24,
  color = 'black',
}: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" stroke={color} strokeOpacity="0.2" strokeWidth="2"/>
    </svg>
  );
}
