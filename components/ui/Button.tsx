import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

const variantClasses = {
  primary: "bg-primary text-white shadow-btn-primary btn-primary",
  secondary: "bg-secondary text-white shadow-btn-secondary btn-secondary",
  outline: "border border-primary text-primary btn-outline",
};

const sizeClasses = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-6 py-3",
  lg: "text-lg px-8 py-4",
};

const defaultClasses = "cursor-pointer rounded-full font-medium transition-colors custom-btn";

const Button = ({ children, icon, iconPosition = "right", className = "", type = "button", variant = "primary", size = "md", ...props }: ButtonProps) => {
  return (
    <button type={type} className={`${defaultClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} {...props}>
      <span className="inline-flex items-center justify-center gap-2">
        {icon && iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
      </span>
    </button>
  );
};

export default Button;
