import Image from "next/image";
import star from "@/assets/imgs/star.png";

const RoatatingStar = ({ position, width, className }: { position: string; width: string | number; className?: string }) => {
  const size = Number(width);

  return (
    <div className={`absolute ${position} z-0 opacity-50 ${className}`} style={{ width: size, height: size }}>
      <Image src={star} width={size} height={size} className="animate-spin [animation-duration:28s] h-full w-full" alt="star" />
    </div>
  );
};

export default RoatatingStar;
