import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
  selected?: boolean;
}

export default function CGDispenserIcon({
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
        d="M16.5 27C16.5 23.9624 18.9624 21.5 22 21.5H39C42.0376 21.5 44.5 23.9624 44.5 27V52C44.5 53.933 42.933 55.5 41 55.5H20C18.067 55.5 16.5 53.933 16.5 52V27Z"
        stroke={color}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M32 4.5C32.8284 4.5 33.5 5.17157 33.5 6L33.5 14C33.5 14.2761 33.2761 14.5 33 14.5L27 14.5C26.7239 14.5 26.5 14.2761 26.5 14L26.5 6C26.5 5.17157 27.1716 4.5 28 4.5L32 4.5Z"
        stroke={color}
        strokeWidth="3"
      />
      <path
        d="M34 7.5H46.25C47.4926 7.5 48.5 8.50736 48.5 9.75V9.75C48.5 10.9926 47.4926 12 46.25 12H34"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M17.5 32.5H43"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect
        x="40.5"
        y="26.5"
        width="16"
        height="16"
        rx="8"
        fill="white"
        stroke={color}
        strokeWidth="3"
      />
      <rect
        x="3.5"
        y="23.5"
        width="7"
        height="7"
        rx="3.5"
        stroke={color}
        strokeWidth="3"
      />
      <path
        d="M50 31C50.6667 31.3333 51.9 32.5 51.5 34.5"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect
        x="7.5"
        y="5.5"
        width="11"
        height="11"
        rx="5.5"
        stroke={color}
        strokeWidth="3"
      />
      <path
        d="M12.5 9C12 9.33333 11 10.4 11 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M23 20.5V17.5C23 16.3954 23.8954 15.5 25 15.5H35C36.1046 15.5 37 16.3954 37 17.5V21.5"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
