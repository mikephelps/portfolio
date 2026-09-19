import type { ComponentType } from "react";
import {
  IconBolt,
  IconCompass,
  IconImage,
  IconLayers,
  IconLayout,
  IconLinkedin,
  IconSliders,
  IconWindow,
} from "../components/Icons";
import linkedinColorTokensImg from "../assets/screens/linkedin-color-tokens.png";
import linkedinComponentsImg from "../assets/screens/linkedin-components.png";

type IconType = ComponentType<{ size?: number }>;

export type ScreenMedia = {
  type: "image" | "video";
  // Put files in src/assets/screens/ and import them (not a public/ path
  // string) so Vite fingerprints and bundles them correctly.
  src: string;
  // Every image/video renders at its own natural aspect ratio, full width
  // — nothing is ever cropped or letterboxed. On desktop only, an
  // unusually tall asset is capped by a max-height safety net (so it can
  // never blow out the pinned viewport) and shrinks proportionally rather
  // than cropping; fit/position only matter for THAT edge case, to control
  // how it shrinks. Leave both unset for the normal case.
  fit?: "cover" | "contain";
  position?: string;
};

export type Screen = {
  id: string;
  label: string;
  Icon: IconType;
  media?: ScreenMedia;
  // A short paragraph of context for this specific image/video — shown on
  // hover (desktop) or under the label (mobile). See ScreenBrowser.tsx /
  // ScreenStack.tsx.
  description?: string;
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
const tbdScreens: Screen[] = [
  {
    id: "tbd",
    label: "Tab sections TBD",
    Icon: IconLayout,
    description: "Description TBD — a short paragraph of context for this image will go here.",
  },
];

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
    screens: [
      {
        id: "color-tokens",
        label: "Design System: Color Tokens",
        Icon: IconSliders,
        media: { type: "image", src: linkedinColorTokensImg },
        description: "Created the design system foundations including full color token architecture.",
      },
      {
        id: "components",
        label: "Design System: Components",
        Icon: IconLayout,
        media: { type: "image", src: linkedinComponentsImg },
        description:
          "Built all new, custom components in Figma including: heroes, cards, features, banners, etc.",
      },
      {
        id: "ai-workflow",
        label: "AI Workflow & Design System",
        Icon: IconBolt,
        description: "Description TBD — a short paragraph of context for this image will go here.",
      },
      {
        id: "aem-tokens-components",
        label: "AEM: Custom Tokens & Components",
        Icon: IconLayers,
        description: "Description TBD — a short paragraph of context for this image will go here.",
      },
      {
        id: "aem-code-seo",
        label: "AEM: Custom Code & SEO",
        Icon: IconWindow,
        description: "Description TBD — a short paragraph of context for this image will go here.",
      },
    ],
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
  {
    id: "atlantic-shared-beginnings",
    index: "04",
    year: "2025",
    title: "Atlantic Fertility & Shared Beginnings",
    role: "Lead Designer & Developer",
    description:
      "From the ground up. Two sister businesses in the fertility space. Both needed full new brands and websites that I designed and developed.",
    tech: ["Illustrator", "Figma", "Framer", "HTML", "CSS"],
    Icon: IconLayers,
    screens: [
      {
        id: "atlantic-brand",
        label: "Atlantic's Brand",
        Icon: IconImage,
        description: "Description TBD — a short paragraph of context for this image will go here.",
      },
      {
        id: "atlantic-web",
        label: "Atlantic's Web",
        Icon: IconWindow,
        description: "Description TBD — a short paragraph of context for this image will go here.",
      },
      {
        id: "shared-beginnings-brand",
        label: "Shared Beginnings' Brand",
        Icon: IconImage,
        description: "Description TBD — a short paragraph of context for this image will go here.",
      },
      {
        id: "shared-beginnings-web",
        label: "Shared Beginnings' Web",
        Icon: IconWindow,
        description: "Description TBD — a short paragraph of context for this image will go here.",
      },
    ],
  },
];
