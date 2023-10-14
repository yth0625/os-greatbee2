import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
  selected?: boolean;
}

export default function CGOfficeEquipmentIcon({
  width = 60,
  height = 60,
  color = '#C5C5C5',
  selected = false,
}: Props) {
  return selected ? (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3.75"
        y="27"
        width="52.5"
        height="16.5"
        rx="3.25"
        stroke={color}
        strokeWidth="3.5"
      />
      <path
        d="M15 47.75V52.25"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M27 47.75L27 53.75"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M33 48.5L33 55.25"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M39 47.75L39 53.75"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M45 47.75L45 53"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M21 47.75L21 54.5"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M47 26.25V13.0784C47 12.548 46.7893 12.0393 46.4142 11.6642L40.0858 5.33579C39.7107 4.96071 39.202 4.75 38.6716 4.75H15C13.8954 4.75 13 5.64543 13 6.75V26.25"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M39.5 6.25V11.75C39.5 12.8546 40.3954 13.75 41.5 13.75H46.5"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3.75"
        y="27"
        width="52.5"
        height="16.5"
        rx="3.25"
        stroke={color}
        strokeWidth="3.5"
      />
      <path
        d="M15 47.75V52.25"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M27 47.75L27 53.75"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M33 48.5L33 55.25"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M39 47.75L39 53.75"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M45 47.75L45 53"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M21 47.75L21 54.5"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M47 26.25V13.0784C47 12.548 46.7893 12.0393 46.4142 11.6642L40.0858 5.33579C39.7107 4.96071 39.202 4.75 38.6716 4.75H15C13.8954 4.75 13 5.64543 13 6.75V26.25"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M39.5 6.25V11.75C39.5 12.8546 40.3954 13.75 41.5 13.75H46.5"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
