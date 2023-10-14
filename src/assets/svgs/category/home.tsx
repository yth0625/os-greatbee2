import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function CGHomeIcon({ width = 62, height = 60, color = '#C5C5C5' }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 62 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.5 41.25H26C24.8954 41.25 24 42.1454 24 43.25V54.75C24 55.3023 23.5523 55.75 23 55.75H12C11.4477 55.75 11 55.3023 11 54.75V33.75H3.41421C2.52331 33.75 2.07714 32.6729 2.70711 32.0429L30.5 4.25"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M31.5 41.25H36C37.1046 41.25 38 42.1454 38 43.25V54.75C38 55.3023 38.4477 55.75 39 55.75H50C50.5523 55.75 51 55.3023 51 54.75V33.75H58.5858C59.4767 33.75 59.9229 32.6729 59.2929 32.0429L31.5 4.25"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
