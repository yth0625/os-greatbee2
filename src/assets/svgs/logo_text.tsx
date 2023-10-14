import React from 'react';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export default function Logo_TextIcon({ width = 138, height = 38, color = '#000000' }: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 138 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.9519 17.4781H11.4719L10.5119 14.5261H4.77586L3.83986 17.4781H0.359863L5.83186 1.83014C6.07186 1.28614 6.33586 0.910136 6.62386 0.702136C6.92786 0.494136 7.29586 0.390137 7.72786 0.390137C8.15986 0.390137 8.50386 0.486136 8.75986 0.678136C9.03186 0.870136 9.27186 1.25414 9.47986 1.83014L14.9519 17.4781ZM9.74386 11.7181L7.72786 4.95014L5.61586 11.7181H9.74386Z"
        fill="#6D6D6D"
      />
      <path
        d="M45.3526 3.36614H39.3285C38.6245 3.36614 38.1285 3.50214 37.8405 3.77414C37.5685 4.04614 37.4325 4.51814 37.4325 5.19014V7.56614H43.6965L43.4566 10.5421H37.4325V17.4781H34.0965V3.87014C34.0965 2.60614 34.3685 1.71014 34.9125 1.18214C35.4725 0.654137 36.4246 0.390137 37.7686 0.390137H45.3526V3.36614Z"
        fill="#6D6D6D"
      />
      <path
        d="M76.3088 3.36614H70.2848C69.5808 3.36614 69.0848 3.50214 68.7968 3.77414C68.5248 4.04614 68.3888 4.51814 68.3888 5.19014V7.56614H74.6528L74.4128 10.5421H68.3888V17.4781H65.0528V3.87014C65.0528 2.60614 65.3248 1.71014 65.8688 1.18214C66.4288 0.654137 67.3808 0.390137 68.7248 0.390137H76.3088V3.36614Z"
        fill="#6D6D6D"
      />
      <path
        d="M106.545 17.4781H101.457C99.537 17.4781 98.145 17.1101 97.281 16.3741C96.433 15.6221 96.009 14.4061 96.009 12.7261V0.390137H99.345V12.7261C99.345 13.3981 99.497 13.8621 99.801 14.1181C100.105 14.3741 100.657 14.5021 101.457 14.5021H106.545V17.4781Z"
        fill="#6D6D6D"
      />
      <path
        d="M137.26 17.4781H131.212C129.292 17.4781 127.94 17.1501 127.156 16.4941C126.388 15.8221 126.004 14.6461 126.004 12.9661V0.390137H137.26V3.36614H129.34V7.37414H134.884L134.644 10.3501H129.34V12.7261C129.34 13.3981 129.492 13.8621 129.796 14.1181C130.1 14.3741 130.652 14.5021 131.452 14.5021H137.26V17.4781Z"
        fill="#6D6D6D"
      />
    </svg>
  );
}
