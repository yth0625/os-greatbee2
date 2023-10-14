import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
  outlined? : boolean;
}

export default function RadioCircleSelectedIcon({
  width = 12,
  height = 12,
  color = '#000000',
  outlined = false,
}: Props) {
  if (outlined){
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" stroke="#565660" stroke-width="2"/>
        <circle cx="10" cy="10" r="5" fill="#565660"/>
      </svg>
    )
  }
  else 
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="12" stroke="#FFC946" strokeWidth="8"/>
    </svg>
  );
}
