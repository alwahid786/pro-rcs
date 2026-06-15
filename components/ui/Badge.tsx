import StarIcon from "@/assets/icons/StarIcon";

const Badge = ({ showIcon = true, text }: { showIcon: boolean; text: string }) => {
  return (
    <div className="bg-secondary rounded-full pl-3 pr-5 py-1.5 flex items-center gap-2 text-white shadow-glass">
      {showIcon && <StarIcon />} <span>{text}</span>
    </div>
  );
};

export default Badge;
