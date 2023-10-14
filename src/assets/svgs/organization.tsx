import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function ClarityOrganizationIcon({
  width = 64,
  height = 64,
  color = '#000000',
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_79_3659)">
        <path
          d="M17.4226 33.422H46.5781V38.8976H49.4226V30.5776H33.4226V24.8887H30.5781V30.5776H14.5781V38.8976H17.4226V33.422Z"
          fill="white"
        />
        <path
          d="M24.888 40.8887H7.11024C5.14656 40.8887 3.55469 42.4805 3.55469 44.4442V55.1109C3.55469 57.0746 5.14656 58.6665 7.11024 58.6665H24.888C26.8517 58.6665 28.4436 57.0746 28.4436 55.1109V44.4442C28.4436 42.4805 26.8517 40.8887 24.888 40.8887Z"
          fill="white"
        />
        <path
          d="M56.888 40.8887H39.1102C37.1466 40.8887 35.5547 42.4805 35.5547 44.4442V55.1109C35.5547 57.0746 37.1466 58.6665 39.1102 58.6665H56.888C58.8517 58.6665 60.4436 57.0746 60.4436 55.1109V44.4442C60.4436 42.4805 58.8517 40.8887 56.888 40.8887Z"
          fill="white"
        />
        <path
          d="M41.3333 5H23.5556C21.5919 5 20 6.59188 20 8.55556V19.2222C20 21.1859 21.5919 22.7778 23.5556 22.7778H41.3333C43.297 22.7778 44.8889 21.1859 44.8889 19.2222V8.55556C44.8889 6.59188 43.297 5 41.3333 5Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_79_3659">
          <rect width="64" height="64" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
