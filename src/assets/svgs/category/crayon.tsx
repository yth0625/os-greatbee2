import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
  selected?: boolean;
}

export default function CGCrayonIcon({
  width = 60,
  height = 61,
  color = '#C5C5C5',
  selected = false,
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="18.9662"
        y="48.6284"
        width="11.6275"
        height="23.2551"
        rx="1"
        transform="rotate(-139.225 18.9662 48.6284)"
        stroke={color}
        strokeWidth="3"
      />
      <path
        d="M19.2374 48.314L12.4277 51.0481C10.0968 51.984 7.71657 49.8123 8.43537 47.4056L10.4321 40.7202"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect
        x="38.6662"
        y="28.3289"
        width="14.9497"
        height="17.4413"
        rx="1"
        transform="rotate(-139.225 38.6662 28.3289)"
        stroke={color}
        strokeWidth="3"
      />
      <rect
        x="47.541"
        y="12.9512"
        width="9.13593"
        height="7.47485"
        rx="1"
        transform="rotate(-139.225 47.541 12.9512)"
        stroke={color}
        strokeWidth="3"
      />
      <path
        d="M36.0647 31.3455C35.704 31.7637 35.0726 31.8104 34.6543 31.4497L24.8477 22.9924C24.4295 22.6318 24.3828 22.0003 24.7435 21.5821L27.3449 18.5656L38.6661 28.3291L36.0647 31.3455Z"
        stroke={color}
        strokeWidth="3"
      />
      <path
        d="M41.6049 33.0569L50.8911 22.2891C51.5797 21.4906 51.7986 20.3892 51.4676 19.3881L50.0567 15.1209"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M6.69855 53.9517L8.8682 51.4358"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
