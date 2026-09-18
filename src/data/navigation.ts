import type { ComponentType } from "react";
import { IconAbout, IconContact, IconProjects } from "../components/Icons";

export type NavItem = {
  id: string;
  label: string;
  href: string;
  Icon: ComponentType<{ size?: number }>;
};

export const navItems: NavItem[] = [
  { id: "about", label: "About", href: "#about", Icon: IconAbout },
  { id: "projects", label: "Projects", href: "#projects", Icon: IconProjects },
  { id: "contact", label: "Contact", href: "#contact", Icon: IconContact },
];
