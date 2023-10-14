import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
  selected?: boolean;
}

export default function CGNasIcon({
  width = 60,
  height = 60,
  color = '#C5C5C5',
  selected = false,
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M42.1754 20.0868C37.3814 11.7102 22.6186 11.7102 17.8246 20.0868C16.633 22.1689 13.5741 23.0778 10.9923 22.1168C8.41051 21.1559 7.28353 18.6889 8.47513 16.6068C16.9504 1.79773 43.0496 1.79773 51.5249 16.6068C52.7165 18.6889 51.5895 21.1559 49.0077 22.1168C46.4259 23.0778 43.367 22.1689 42.1754 20.0868Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect
        x="4.5"
        y="36"
        width="7"
        height="13"
        rx="3.5"
        stroke={color}
        strokeWidth="3"
      />
      <rect
        x="9.5"
        y="30"
        width="9"
        height="23"
        rx="4.5"
        fill="white"
        stroke={color}
        strokeWidth="3"
      />
      <path
        d="M12.5 24.5C12.1667 25.6667 11.6 28.3 12 29.5M8.99998 21.5C8.16665 22.5 6.70004 27.8 7.50004 35"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect
        x="-1.5"
        y="1.5"
        width="7"
        height="13"
        rx="3.5"
        transform="matrix(-1 0 0 1 54 34.5)"
        stroke={color}
        strokeWidth="3"
      />
      <rect
        x="-1.5"
        y="1.5"
        width="9"
        height="23"
        rx="4.5"
        transform="matrix(-1 0 0 1 49 28.5)"
        fill="white"
        stroke={color}
        strokeWidth="3"
      />
      <path
        d="M47.5 24.5C47.8333 25.6667 48.4 28.3 48 29.5M51 21.5C51.8334 22.5 53.3 27.8 52.5 35"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

