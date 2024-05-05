import React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

const Capsule = ({ color = '#F53C40', ...other }: Props) => {
  return (
    <svg
      width="127"
      height="63"
      viewBox="0 0 127 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <g filter="url(#filter1_d_8_129)">
        <path
          d="M64.2729 54.4487H31.0002C16.0885 54.4487 4.00022 42.3604 4.00022 27.4487V27.4487C4.00022 12.537 16.0885 0.44873 31.0002 0.44873H64.2729V54.4487Z"
          fill={color}
        />
      </g>
      <g filter="url(#filter2_d_8_129)">
        <path
          d="M64.2729 0.44873L96.0002 0.44873C110.912 0.44873 123 12.537 123 27.4487V27.4487C123 42.3604 110.912 54.4487 96.0002 54.4487H64.2729V0.44873Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_8_129"
          x="60.2729"
          y="0.44873"
          width="66.7271"
          height="62"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_8_129"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_8_129"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_8_129"
          x="0"
          y="0.44873"
          width="68.2729"
          height="62"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_8_129"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_8_129"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_d_8_129"
          x="60.2729"
          y="0.44873"
          width="66.7271"
          height="62"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_8_129"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_8_129"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Capsule;
