import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function CGElectronicIcon({
  width = 60,
  height = 60,
  color = '#C5C5C5',
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1.5"
        y="9.5"
        width="57"
        height="38.9535"
        rx="1.5"
        stroke={color}
        strokeWidth="3"
      />
      <path
        d="M43.4483 9.53491V48.4186"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <mask id="path-3-inside-1_92_2596" fill="white">
        <rect x="5.17242" y="14.1396" width="35.1724" height="30.6977" rx="2" />
      </mask>
      <rect
        x="5.17242"
        y="14.1396"
        width="35.1724"
        height="30.6977"
        rx="2"
        stroke={color}
        strokeWidth="6"
        mask="url(#path-3-inside-1_92_2596)"
      />
      <rect
        x="48.6207"
        y="16.186"
        width="5.17241"
        height="5.11628"
        rx="2.55814"
        fill={color}
      />
      <rect
        x="48.6207"
        y="23.3489"
        width="5.17241"
        height="5.11628"
        rx="2.55814"
        fill={color}
      />
      <path
        d="M43.9655 39.7209H57.4138"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M3.10345 48.4187V50.0001C3.10345 51.1047 3.99888 52.0001 5.10345 52.0001H10.931C12.0356 52.0001 12.931 51.1047 12.931 50.0001V48.4187"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M46.5517 48.4187V50.0001C46.5517 51.1047 47.4471 52.0001 48.5517 52.0001H54.3793C55.4839 52.0001 56.3793 51.1047 56.3793 50.0001V48.4187"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
