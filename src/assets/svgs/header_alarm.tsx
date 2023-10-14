import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function HeaderAlarmIcon({
  width = 40,
  height = 40,
  color = '#000000',
}: Props) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 27H30M13 27V17C13 13.134 16.134 10 20 10C23.866 10 27 13.134 27 17V27H13Z"
        stroke="#222222"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20 30C21.3807 30 22.5 28.8807 22.5 27.5V27H17.5V27.5C17.5 28.8807 18.6193 30 20 30Z"
        fill="white"
        stroke="#222222"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
