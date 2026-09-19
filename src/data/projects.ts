import type { ComponentType } from "react";
import { IconBolt, IconCompass, IconLayout, IconLinkedin } from "../components/Icons";

type IconType = ComponentType<{ size?: number }>;

export type Screen = {
  id: string;
  label: string;
  Icon: IconType;
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
  Icon: IconType;
};

// Placeholder screen list shared until real screenshots are ready for each
// project — one zone so the browser still renders (and pins/scrubs) with
// something in it rather than an empty state.
const tbdScreens: Screen[] = [{ id: "tbd", label: "Tab sections TBD", Icon: IconLayout }];

export const clientProjects: ClientProject[] = [
  {
    id: "linkedin",
    index: "01",
    year: "2025-Current",
    title: "LinkedIn",
    role: "Senior UX Designer",
    description:
      "Co-lead the design system foundation with tokens, colors system, and initial components. Introduced design engineering workflow with Claude/Copilot to build and ship projects in AEM.",
    tech: ["Figma", "Design Systems", "AEM", "Claude", "HTML", "CSS", "GitHub"],
    Icon: IconLinkedin,
    screens: tbdScreens,
  },
  {
    id: "roboro",
    index: "02",
    year: "2025",
    title: "Roboro",
    role: "Web/Product Designer",
    description:
      "Stood up a full new brand for this startup, followed by designing and building their entire web experience with CMS, and bringing it all together with product UX and design.",
    tech: ["Figma", "Design Systems", "Framer", "Animation"],
    Icon: IconBolt,
    screens: tbdScreens,
  },
  {
    id: "visier",
    index: "03",
    year: "2021-2025",
    title: "Visier",
    role: "Lead UI/UX Designer",
    description:
      "Redesigned .com experience with a full design system. Worked directly with engineering to build the new site and bring innovative tech into the fold, like Rive & Framer Motion animation.",
    tech: ["Figma", "Design Systems", "Product UI", "Animation"],
    Icon: IconCompass,
    screens: tbdScreens,
  },
];
