import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function FloatingDownIcon({
  width = 24,
  height = 24,
  color = '#ADADAD',
}: Props) {
  return (
    <svg
      width="23"
      height="25"
      viewBox="0 0 23 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.6001 13.7096L11.9867 21.8434C11.6013 22.2073 10.9989 22.2073 10.6135 21.8434L2.0001 13.7096"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M11.3001 22.4917L11.3001 2.00008"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
