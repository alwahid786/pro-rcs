import Link from "next/link";
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonBaseProps = {
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
};

type ButtonAsButtonProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLinkProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white shadow-btn-primary btn-primary",
  secondary: "bg-secondary text-white shadow-btn-secondary btn-secondary",
  outline: "border border-primary text-primary btn-outline",
  ghost: "border border-white/30 bg-transparent text-white hover:bg-white/5",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-6 py-3",
  lg: "text-lg px-8 py-4",
};

const baseClasses = "custom-btn inline-flex cursor-pointer items-center justify-center rounded-full font-medium transition-colors";

const Button = (props: ButtonProps) => {
  const {
    children,
    icon,
    iconPosition = "right",
    className,
    variant = "primary",
    size = "md",
    href,
    ...rest
  } = props;

  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  const content = (
    <span className="inline-flex items-center justify-center gap-2">
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </span>
  );

  if (href) {
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return (
        <a href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...(rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">)}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
};

export default Button;
