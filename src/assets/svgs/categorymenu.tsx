import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function CategoryMenuIcon({
  width = 38,
  height = 30,
  color = '#000000',
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 38 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.66675 3.66669H34.8667"
        stroke="#FFC74C"
        strokeWidth="5.48984"
        strokeLinecap="round"
      />
      <path
        d="M3.66675 15.2583H34.8667"
        stroke="#FFC74C"
        strokeWidth="5.48984"
        strokeLinecap="round"
      />
      <path
        d="M3.66699 26.8499H34.5782"
        stroke="#FFC74C"
        strokeWidth="5.63333"
        strokeLinecap="round"
      />
    </svg>
  );
}
