import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function UserIcon({
  width = 105,
  height = 109,
  color = '#000000',
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 105 109"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M52.5 6.10352e-05C59.4619 6.10352e-05 66.1387 2.87103 71.0616 7.9814C75.9844 13.0918 78.75 20.0229 78.75 27.2501C78.75 34.4772 75.9844 41.4084 71.0616 46.5187C66.1387 51.6291 59.4619 54.5001 52.5 54.5001C45.5381 54.5001 38.8613 51.6291 33.9384 46.5187C29.0156 41.4084 26.25 34.4772 26.25 27.2501C26.25 20.0229 29.0156 13.0918 33.9384 7.9814C38.8613 2.87103 45.5381 6.10352e-05 52.5 6.10352e-05ZM52.5 68.1251C81.5063 68.1251 105 80.3194 105 95.3751V109H0V95.3751C0 80.3194 23.4937 68.1251 52.5 68.1251Z"
        fill="black"
        fillOpacity="0.2"
      />
    </svg>
  );
}
