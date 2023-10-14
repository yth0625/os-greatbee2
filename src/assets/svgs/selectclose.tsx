import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function SelectCloseIcon({
  width = 36,
  height = 36,
  color = '#000000',
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 3L33 33"
        stroke="#FFC74C"
        strokeWidth="5.49"
        strokeLinecap="round"
      />
      <path
        d="M3 33L33 3"
        stroke="#FFC74C"
        strokeWidth="5.49"
        strokeLinecap="round"
      />
    </svg>
  );
}
