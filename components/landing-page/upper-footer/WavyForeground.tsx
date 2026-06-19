const WavyForeground = () => {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 w-full">
      <svg viewBox="0 0 1440 280" preserveAspectRatio="none" className="block h-36 w-full sm:h-44 lg:h-56" aria-hidden>
        <path fill="#FFF0E6" d="M0 112C280 208 560 56 840 128C1120 200 1280 72 1440 128V280H0V112Z" />
        <path fill="#FFF8F4" d="M0 168C300 88 600 224 920 160C1140 112 1300 196 1440 152V280H0V168Z" />
        <path fill="#FFFFFF" d="M0 204C360 148 720 240 1080 196C1240 172 1360 224 1440 204V280H0V204Z" />
      </svg>
    </div>
  );
};

export default WavyForeground;
