import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function HomeIcon({ width = 32, height = 32 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M16.0001 29.3337C23.3334 29.3337 29.3334 23.3337 29.3334 16.0003C29.3334 8.66699 23.3334 2.66699 16.0001 2.66699C8.66675 2.66699 2.66675 8.66699 2.66675 16.0003C2.66675 23.3337 8.66675 29.3337 16.0001 29.3337Z"
        stroke="#FF0000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16 10.667V17.3337"
        stroke="#FF0000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.9927 21.333H16.0047"
        stroke="#FF0000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
