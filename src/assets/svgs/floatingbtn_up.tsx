import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function FloatingUpIcon({
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
        d="M2 10.7821L10.6134 2.64834C10.9988 2.28442 11.6012 2.28442 11.9866 2.64834L20.6 10.7821"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M11.3 2V22.4916"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
