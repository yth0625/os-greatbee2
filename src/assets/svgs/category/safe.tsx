import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function CGSafeIcon({ width = 44, height = 57, color = '#C5C5C5' }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 44 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M38 19.3332H35.3333V13.9998C35.3333 6.63984 29.36 0.666504 22 0.666504C14.64 0.666504 8.66663 6.63984 8.66663 13.9998V19.3332H5.99996C3.06663 19.3332 0.666626 21.7332 0.666626 24.6665V51.3332C0.666626 54.2665 3.06663 56.6665 5.99996 56.6665H38C40.9333 56.6665 43.3333 54.2665 43.3333 51.3332V24.6665C43.3333 21.7332 40.9333 19.3332 38 19.3332ZM22 43.3332C19.0666 43.3332 16.6666 40.9332 16.6666 37.9998C16.6666 35.0665 19.0666 32.6665 22 32.6665C24.9333 32.6665 27.3333 35.0665 27.3333 37.9998C27.3333 40.9332 24.9333 43.3332 22 43.3332ZM30.2666 19.3332H13.7333V13.9998C13.7333 9.43984 17.44 5.73317 22 5.73317C26.56 5.73317 30.2666 9.43984 30.2666 13.9998V19.3332Z"
        fill={color}
      />
    </svg>
  );
}
