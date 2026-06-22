type ArrowRightIconProps = {
  className?: string;
};

const ArrowRightIcon = ({ className }: ArrowRightIconProps) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M3 8H11V6H13V4H15V6H13V8H11V10H13V12H15V14H13V12H11V10H3V8Z" fill="currentColor" />
    </svg>
  );
};

export default ArrowRightIcon;
