import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function HeaderChatIcon({
  width = 40,
  height = 40,
  color = '#000000',
}: Props) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5 10.2119C10.3954 10.2119 9.5 11.1073 9.5 12.2119V29.4876C9.5 29.7549 9.82314 29.8888 10.0121 29.6998L14.5 25.2119H28.5C29.6046 25.2119 30.5 24.3165 30.5 23.2119V12.2119C30.5 11.1073 29.6046 10.2119 28.5 10.2119H11.5Z"
        stroke="#222222"
        stroke-width="1.7"
      />
    </svg>
  );
}
