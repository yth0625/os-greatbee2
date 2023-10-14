import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function StarIcon({ width = 26, height = 25, color = '#000000' }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 20.905L19.225 24.67C20.365 25.36 21.76 24.34 21.46 23.05L19.81 15.97L25.315 11.2C26.32 10.33 25.78 8.68002 24.46 8.57502L17.215 7.96002L14.38 1.27001C13.87 0.0550147 12.13 0.0550147 11.62 1.27001L8.78499 7.94501L1.53999 8.56001C0.219987 8.66502 -0.320013 10.315 0.684987 11.185L6.18999 15.955L4.53999 23.035C4.23999 24.325 5.63499 25.345 6.77499 24.655L13 20.905Z"
        fill={color}
      />
    </svg>
  );
}
