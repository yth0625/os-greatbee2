import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function InfoIcon({
  width = 12,
  height = 12,
  color = '#000000',
}: Props) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 30C23.925 30 30 23.925 30 16.5C30 9.075 23.925 3 16.5 3C9.075 3 3 9.075 3 16.5C3 23.925 9.075 30 16.5 30Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 11V18"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 21H16.012"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
