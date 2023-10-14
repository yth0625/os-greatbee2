import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function CGOfficeSuppliesIcon({
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
        x="14.7826"
        y="30"
        width="30.4348"
        height="7.6087"
        rx="3"
        stroke={color}
        strokeWidth="3"
      />
      <rect
        x="5"
        y="21.3042"
        width="9.78261"
        height="5.43478"
        rx="2.71739"
        stroke={color}
        strokeWidth="3"
      />
      <rect
        x="45.2174"
        y="21.3042"
        width="9.78261"
        height="5.43478"
        rx="2.71739"
        stroke={color}
        strokeWidth="3"
      />
      <path
        d="M16.9565 10.739C16.9565 5.76845 20.986 1.73901 25.9565 1.73901H34.0435C39.0141 1.73901 43.0435 5.76845 43.0435 10.739V29.9999H16.9565V10.739Z"
        stroke={color}
        strokeWidth="3"
      />
      <path
        d="M49.5652 27.8259V32.3477C49.5652 33.4522 48.6698 34.3477 47.5652 34.3477H46.3043"
        stroke={color}
        strokeWidth="3"
      />
      <path
        d="M10.4348 27.8259V32.3477C10.4348 33.4522 11.3302 34.3477 12.4348 34.3477H13.6957"
        stroke={color}
        strokeWidth="3"
      />
      <path
        d="M25.6522 38.6956V39.4129C25.6522 40.5175 26.5477 41.4129 27.6522 41.4129H33.4348C34.5394 41.4129 35.4348 40.5175 35.4348 39.4129V38.6956"
        stroke={color}
        strokeWidth="3"
      />
      <path
        d="M28.3695 40.8694V43.8495C28.3695 44.9188 27.5285 45.7989 26.4603 45.8475L18.0976 46.2276C17.1244 46.2718 16.3247 47.0108 16.2038 47.9775L15.8695 50.652M28.913 52.2824V51.713C28.913 50.5523 27.9282 49.6354 26.7705 49.7181L22.0485 50.0554C21.5685 50.0896 21.117 50.2958 20.7767 50.6361L19.1304 52.2824"
        stroke={color}
        strokeWidth="3"
      />
      <path
        d="M33.8043 40.8694V43.8495C33.8043 44.9188 34.6454 45.7989 35.7135 45.8475L44.0763 46.2276C45.0494 46.2718 45.8492 47.0108 45.97 47.9775L46.3043 50.652M33.2608 52.2824V51.713C33.2608 50.5523 34.2456 49.6354 35.4033 49.7181L40.1254 50.0554C40.6053 50.0896 41.0568 50.2958 41.3971 50.6361L43.0435 52.2824"
        stroke={color}
        strokeWidth="3"
      />
      <circle
        cx="31.0869"
        cy="54.9999"
        r="3.26087"
        stroke={color}
        strokeWidth="3"
      />
      <circle
        cx="16.9565"
        cy="53.913"
        r="3.26087"
        stroke={color}
        strokeWidth="3"
      />
      <circle
        cx="45.2174"
        cy="53.913"
        r="3.26087"
        stroke={color}
        strokeWidth="3"
      />
    </svg>
  );
}
