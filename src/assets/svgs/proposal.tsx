import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function ProposalIcon({
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
        d="M21.2579 5H10.8913C9.17365 5 7.78125 6.64162 7.78125 8.66667V23.3333C7.78125 25.3584 9.17365 27 10.8913 27H21.2579C22.9756 27 24.3679 25.3584 24.3679 23.3333V8.66667M21.2579 5C22.9756 5 24.3679 6.64162 24.3679 8.66667M21.2579 5C20.6854 5 20.2213 5.54721 20.2213 6.22222V9.88889C20.2213 10.5639 20.6854 11.1111 21.2579 11.1111H23.3313C23.9038 11.1111 24.3679 10.5639 24.3679 9.88889V8.66667M11.9279 14.7778H20.2213M11.9279 18.4444H20.2213"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
