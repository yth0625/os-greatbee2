import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function BlankIcon({
  width = 24,
  height = 24,
  color = '#ADADAD',
}: Props) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5807 3.38949V12.7228H4.2474V3.38949H13.5807ZM13.5807 2.05615H4.2474C3.51406 2.05615 2.91406 2.65615 2.91406 3.38949V12.7228C2.91406 13.4562 3.51406 14.0562 4.2474 14.0562H13.5807C14.3141 14.0562 14.9141 13.4562 14.9141 12.7228V3.38949C14.9141 2.65615 14.3141 2.05615 13.5807 2.05615Z"
        fill="#CCCCCC"
      />
    </svg>
  );
}
