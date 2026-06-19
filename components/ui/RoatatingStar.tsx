import Image from "next/image";
import star from "@/assets/imgs/star.png";
const RoatatingStar = () => {
  return <Image src={star} className="animate-spin [animation-duration:28s] w-full h-full" alt="star" width={100} height={100} />;
};

export default RoatatingStar;
