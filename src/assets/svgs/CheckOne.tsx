import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function CheckOne({
  width = 64,
  height = 64,
  color = '#000000',
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 64 64"
      fill="none"
    >
      <path
        d="M31.8333 58.333C35.314 58.3375 38.7613 57.6541 41.977 56.3221C45.1927 54.99 48.1135 53.0356 50.5714 50.5711C53.0359 48.1132 54.9903 45.1924 56.3224 41.9767C57.6544 38.761 58.3378 35.3137 58.3333 31.833C58.3377 28.3523 57.6543 24.9051 56.3223 21.6894C54.9902 18.4737 53.0358 15.5529 50.5714 13.0949C48.1135 10.6304 45.1927 8.676 41.977 7.34396C38.7613 6.01192 35.314 5.32852 31.8333 5.33303C28.3526 5.32859 24.9054 6.01203 21.6897 7.34406C18.474 8.6761 15.5532 10.6305 13.0952 13.0949C10.6308 15.5529 8.6764 18.4737 7.34437 21.6894C6.01233 24.9051 5.3289 28.3523 5.33334 31.833C5.32883 35.3137 6.01223 38.761 7.34427 41.9767C8.67631 45.1924 10.6307 48.1132 13.0952 50.5711C15.5532 53.0355 18.474 54.9899 21.6897 56.322C24.9054 57.654 28.3526 58.3374 31.8333 58.333Z"
        stroke="#909090"
        stroke-opacity="0.7"
        stroke-width="2"
        stroke-linejoin="round"
      />
      <path
        d="M21.2332 31.8328L29.1832 39.7828L45.0832 23.8828"
        stroke="#909090"
        stroke-opacity="0.7"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
