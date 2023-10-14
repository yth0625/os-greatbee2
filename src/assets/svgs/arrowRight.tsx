import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function TriangleRightIcon({
  width = 32,
  height = 32,
  color = '#000000',
}: Props) {
  return (
    <svg
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M-0.00012207 9.16675L6.00012 5.00008L-0.000122435 0.833414"
        fill="black"
      />
    </svg>
  );
}
