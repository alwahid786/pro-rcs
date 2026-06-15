"use client";
import Button from "./ui/Button";
import RightIcon from "@iconify-react/ep/right";

const Header = () => {
  return (
    <header className="flex flex-col gap-4 items-center">
      Header
      <Button icon={<RightIcon height="18" />}>Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="outline">Outline Button</Button>
    </header>
  );
};

export default Header;
