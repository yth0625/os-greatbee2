import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
  selected?: boolean;
}

export default function CGInkTonerIcon({
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
        d="M11.5 20.5333C11.5 19.8001 11.9013 19.1256 12.5457 18.7757L14.2515 17.8496C17.5248 16.0724 21.4752 16.0724 24.7485 17.8496L26.4543 18.7757C27.0987 19.1256 27.5 19.8001 27.5 20.5333V56C27.5 57.1046 26.6046 58 25.5 58H13.5C12.3954 58 11.5 57.1046 11.5 56L11.5 20.5333Z"
        stroke={color}
        strokeWidth="3"
      />
      <rect
        x="15.5"
        y="11.5"
        width="8"
        height="5"
        rx="1"
        stroke={color}
        strokeWidth="3"
      />
      <path d="M18.5 2H20.5L22.5 10H16.5L18.5 2Z" fill={color} />
      <path
        d="M12.5 26H26.5"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M12.5 49H26.5"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M32.5 20.5333C32.5 19.8001 32.9013 19.1256 33.5457 18.7757L35.2515 17.8496C38.5248 16.0724 42.4752 16.0724 45.7485 17.8496L47.4543 18.7757C48.0987 19.1256 48.5 19.8001 48.5 20.5333V56C48.5 57.1046 47.6046 58 46.5 58H34.5C33.3954 58 32.5 57.1046 32.5 56L32.5 20.5333Z"
        stroke={color}
        strokeWidth="3"
      />
      <rect
        x="36.5"
        y="11.5"
        width="8"
        height="5"
        rx="1"
        stroke={color}
        strokeWidth="3"
      />
      <path d="M39.5 2H41.5L43.5 10H37.5L39.5 2Z" fill={color} />
      <path
        d="M33.5 26H47.5"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M33.5 49H47.5"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
