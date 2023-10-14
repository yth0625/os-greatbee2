import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function Arrow_LeftIcon({
  width = 32,
  height = 32,
  color = '#000000',
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 6L11 16L21 26"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
