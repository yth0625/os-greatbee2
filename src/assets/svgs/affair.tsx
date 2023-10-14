import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function AffairIcon({
  width = 12,
  height = 12,
  color = '#000000',
}: Props) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.3564 23.6155H21.4993V27.0001H18.3564V23.6155ZM23.8564 23.6155H26.9993V27.0001H23.8564V23.6155ZM18.3564 17.6924H21.4993V21.077H18.3564V17.6924ZM23.8564 17.6924H26.9993V21.077H23.8564V17.6924Z"
        fill={color}
        stroke={color}
        strokeWidth="0.5"
      />
      <path
        d="M16.7857 23.6154H6.57143V11.7692H25.4286V16H27V11.7692C26.9996 11.3205 26.8339 10.8904 26.5393 10.5731C26.2447 10.2558 25.8452 10.0774 25.4286 10.0769H20.7143V6.69231C20.7139 6.24362 20.5482 5.81343 20.2536 5.49616C19.959 5.17889 19.5595 5.00045 19.1429 5H12.8571C12.4405 5.00045 12.041 5.17889 11.7464 5.49616C11.4518 5.81343 11.2861 6.24362 11.2857 6.69231V10.0769H6.57143C6.15479 10.0774 5.75533 10.2558 5.46072 10.5731C5.16611 10.8904 5.00042 11.3205 5 11.7692V23.6154C5.00042 24.0641 5.16611 24.4943 5.46072 24.8115C5.75533 25.1288 6.15479 25.3072 6.57143 25.3077H16.7857V23.6154ZM12.8571 6.69231H19.1429V10.0769H12.8571V6.69231Z"
        fill={color}
        stroke={color}
        strokeWidth="0.5"
      />
    </svg>
  );
}
