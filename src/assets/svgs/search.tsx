import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function SearchIcon({ width = 26, height = 26, color = '#000000' }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 26"
      fill="none"
      stroke="var(--font-color-sub)"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.8751 19.875L24 24M22.6247 12.3125C22.6247 18.0079 18.0077 22.625 12.3124 22.625C6.617 22.625 2 18.0079 2 12.3125C2 6.61706 6.617 2 12.3124 2C18.0077 2 22.6247 6.61706 22.6247 12.3125Z"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
