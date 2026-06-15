const SearchIcon = () => {
  return (
    <svg width="117" height="68" viewBox="0 0 117 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_dii_409_513)">
        <rect x="34" y="9" width="49" height="49" rx="24.5" fill="#1A1612" />
        <path d="M67.5002 42.5002L63.1602 38.1602" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path
          d="M57.5 40.5C61.9183 40.5 65.5 36.9183 65.5 32.5C65.5 28.0817 61.9183 24.5 57.5 24.5C53.0817 24.5 49.5 28.0817 49.5 32.5C49.5 36.9183 53.0817 40.5 57.5 40.5Z"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <filter id="filter0_dii_409_513" x="0" y="-25" width="117" height="117" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="17" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_409_513" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_409_513" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="5" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_409_513" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="-4" />
          <feGaussianBlur stdDeviation="6.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="effect2_innerShadow_409_513" result="effect3_innerShadow_409_513" />
        </filter>
      </defs>
    </svg>
  );
};

export default SearchIcon;
