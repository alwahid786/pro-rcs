const SearchIcon = () => {
  return (
    <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_ii_409_513)">
        <rect width="49" height="49" rx="24.5" fill="#1A1612" />
        <path d="M33.5002 33.5002L29.1602 29.1602" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M23.5 31.5C27.9183 31.5 31.5 27.9183 31.5 23.5C31.5 19.0817 27.9183 15.5 23.5 15.5C19.0817 15.5 15.5 19.0817 15.5 23.5C15.5 27.9183 19.0817 31.5 23.5 31.5Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter id="filter0_ii_409_513" x="0" y="-4" width="49" height="57" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="5" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_409_513" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="-4" />
          <feGaussianBlur stdDeviation="6.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="effect1_innerShadow_409_513" result="effect2_innerShadow_409_513" />
        </filter>
      </defs>
    </svg>
  );
};

export default SearchIcon;
