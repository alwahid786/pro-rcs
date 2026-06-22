import PixelArrowRightIcon from "@iconify-react/pixelarticons/arrow-right";

type ArrowRightIconProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
};

const ArrowRightIcon = ({ className, width = 18, height = 18 }: ArrowRightIconProps) => (
  <PixelArrowRightIcon className={className} width={width} height={height} aria-hidden />
);

export default ArrowRightIcon;
