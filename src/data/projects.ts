import type { ComponentType } from "react";
import { IconBolt, IconCompass, IconLayers } from "../components/Icons";

export type Screen = {
  id: string;
  label: string;
};

export type ClientProject = {
  id: string;
  index: string;
  year: string;
  title: string;
  role: string;
  description: string;
  tech: string[];
  link?: string;
  repo?: string;
  screens: Screen[];
  Icon: ComponentType<{ size?: number }>;
};

export const clientProjects: ClientProject[] = [
  {
    id: "aperture",
    index: "01",
    year: "2025",
    title: "Aperture Analytics",
    role: "Lead product designer, front-end build",
    description:
      "A real-time analytics dashboard for creative teams. I led research and interaction design, built the design system, and shipped the front end myself — down to the chart transition timing.",
    tech: ["Figma", "Design systems", "React", "TypeScript", "D3.js"],
    link: "#",
    repo: "#",
    Icon: IconLayers,
    screens: [
      { id: "overview", label: "Dashboard overview" },
      { id: "chart", label: "Live chart detail" },
      { id: "workspace", label: "Team workspace" },
      { id: "mobile", label: "Mobile view" },
    ],
  },
  {
    id: "northwind",
    index: "02",
    year: "2024",
    title: "Northwind Commerce",
    role: "UX lead, design systems",
    description:
      "A headless commerce storefront and the component library behind it — built for speed, with motion-first micro-interactions on top of a strict performance budget.",
    tech: ["Product strategy", "Design systems", "Next.js", "Framer Motion"],
    link: "#",
    Icon: IconBolt,
    screens: [
      { id: "home", label: "Storefront home" },
      { id: "product", label: "Product detail" },
    ],
  },
  {
    id: "orbit",
    index: "03",
    year: "2023",
    title: "Orbit Studio",
    role: "Solo designer & builder",
    description:
      "A WebGL product configurator that lets users customize a physical product in real time, tweak materials, and export a shareable render — concept through code.",
    tech: ["User research", "Prototyping", "Three.js", "React"],
    repo: "#",
    Icon: IconCompass,
    screens: [
      { id: "configurator", label: "Configurator UI" },
      { id: "render", label: "Render export" },
      { id: "materials", label: "Material picker" },
      { id: "share", label: "Share flow" },
    ],
  },
];
