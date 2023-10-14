import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function CGFileBinderIcon({
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
      <path
        d="M43.2725 7.25V10.75C43.2725 11.8546 44.168 12.75 45.2725 12.75H46.2725C47.3771 12.75 48.2725 13.6454 48.2725 14.75V33.25C48.2725 34.3546 47.3771 35.25 46.2725 35.25H45.2725C44.168 35.25 43.2725 36.1454 43.2725 37.25V52.75C43.2725 53.8546 42.3771 54.75 41.2725 54.75H8.77252C7.66795 54.75 6.77252 53.8546 6.77252 52.75V7.25C6.77252 6.14543 7.66795 5.25 8.77252 5.25H41.2725C42.3771 5.25 43.2725 6.14543 43.2725 7.25Z"
        stroke={color}
        strokeWidth="3"
      />
      <path
        d="M42.3975 7.25H51.2275C52.332 7.25 53.2275 8.14543 53.2275 9.25V51.25C53.2275 52.3546 52.332 53.25 51.2275 53.25H41.7725"
        stroke={color}
        strokeWidth="3"
      />
      <path
        d="M13.2725 17.25H38.7725"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
