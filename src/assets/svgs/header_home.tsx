import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function HeaderHomeIcon({
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
        d="M19.8 24.5002H19.2C18.0954 24.5002 17.2 25.3956 17.2 26.5002V29.3002C17.2 29.8525 16.7523 30.3002 16.2 30.3002H13C12.4477 30.3002 12 29.8525 12 29.3002V21.5002H10.4142C9.52331 21.5002 9.07714 20.4231 9.70711 19.7931L19.8 9.7002"
        stroke="#222222"
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M20.2 24.5002H20.8C21.9046 24.5002 22.8 25.3956 22.8 26.5002V29.3002C22.8 29.8525 23.2477 30.3002 23.8 30.3002H27C27.5523 30.3002 28 29.8525 28 29.3002V21.5002H29.5858C30.4767 21.5002 30.9229 20.4231 30.2929 19.7931L20.2 9.7002"
        stroke="#222222"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
}
