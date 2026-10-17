import { SVGProps } from "react";

export type navLinks = {
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  href: string;
  label: string;
};
