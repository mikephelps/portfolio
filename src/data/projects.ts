import type { ComponentType } from "react";
import {
  IconBolt,
  IconCalendar,
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
import linkedinAiWorkflowImg from "../assets/screens/linkedin-ai-workflow.png";
import linkedinAemTokensComponentsImg from "../assets/screens/linkedin-aem-tokens-components.png";
import linkedinAemCodeSeoImg from "../assets/screens/linkedin-aem-code-seo.png";
import roboroBrandingImg from "../assets/screens/roboro-branding.png";
import roboroWebsiteHeroImg from "../assets/screens/roboro-website-hero.png";
import roboroLandingPageVideo from "../assets/screens/roboro-landing-page.mp4";
import roboroBillsImg from "../assets/screens/roboro-bills.png";
import roboroCalendarImg from "../assets/screens/roboro-calendar.png";
import visierHeroVideo from "../assets/screens/visier-hero.mp4";
import visierPlatformVideo from "../assets/screens/visier-platform.mp4";
import visierVeeVideo from "../assets/screens/visier-vee.mp4";
import visierProductLibraryImg from "../assets/screens/visier-product-library.png";
import atlanticBrandImg from "../assets/screens/atlantic-brand.png";
import atlanticWebVideo from "../assets/screens/atlantic-web.mp4";
import sharedBeginningsBrandImg from "../assets/screens/shared-beginnings-brand.png";
import sharedBeginningsWebVideo from "../assets/screens/shared-beginnings-web.mp4";

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
  // The fuller narrative behind the role, shown in the "View role details"
  // slide-out drawer — one entry per paragraph. Placeholder copy for now.
  roleDetails: string[];
  link?: string;
  repo?: string;
  screens: Screen[];
  Icon: IconType;
};

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
    roleDetails: [
      "Placeholder role notes for LinkedIn — real copy coming soon. This panel will hold the fuller narrative about scope, ownership, and impact for this engagement, beyond what the one-line summary and tech chips above can carry.",
      "Placeholder paragraph two: context on how the work started, who was involved, and what the initial goals were before the design system took its current shape.",
      "Placeholder paragraph three: the day-to-day of the role — what shipped, what changed along the way, and how decisions got made across design and engineering.",
      "Placeholder paragraph four: outcomes and what this work set up for the team going forward.",
    ],
    Icon: IconLinkedin,
    screens: [
      {
        id: "color-tokens",
        label: "Design System: Color Tokens",
        Icon: IconSliders,
        media: { type: "image", src: linkedinColorTokensImg },
        description:
          "After new brand rollouts, I created a system in Figma of 70+ raw, primitive color bases and 110 semantic web color tokens, inclusive of light and dark mode collections. This work also included full documentation with color application details and rules and compliance on contrast/accessibility, UI, links, text over imagery, status, accent usage, etc.",
      },
      {
        id: "components",
        label: "Design System: Components",
        Icon: IconLayout,
        media: { type: "image", src: linkedinComponentsImg },
        description:
          "Co-lead build-out of all new, custom components in Figma including: heroes, cards, features, banners that represent all of the foundational and most commonly used elements across the website. This work included auditing existing patterns as well as creating variants and mobile representations of each component.",
      },
      {
        id: "ai-workflow",
        label: "AI Workflow & Design System",
        Icon: IconBolt,
        media: { type: "image", src: linkedinAiWorkflowImg },
        description:
          "Connected Claude and GitHub Copilot into the Figma-to-Adobe pipeline, introducing an AI-assisted workflow for building and maintaining the design system.",
      },
      {
        id: "aem-tokens-components",
        label: "AEM: Custom Tokens & Components",
        Icon: IconLayers,
        media: { type: "image", src: linkedinAemTokensComponentsImg },
        description: "Extended the token architecture into AEM and built custom components, like this accordion, on top of it.",
      },
      {
        id: "aem-code-seo",
        label: "AEM: Custom Code & SEO",
        Icon: IconWindow,
        media: { type: "image", src: linkedinAemCodeSeoImg },
        description:
          "Hand-coded custom AEM components and structured data (JSON-LD schema) to support SEO and AI discovery tools.",
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
    roleDetails: [
      "Placeholder role notes for Roboro — real copy coming soon. This panel will hold the fuller narrative about scope, ownership, and impact for this engagement, beyond what the one-line summary and tech chips above can carry.",
      "Placeholder paragraph two: context on how the work started, who was involved, and what the initial goals were before the brand and site took their current shape.",
      "Placeholder paragraph three: the day-to-day of the role — what shipped, what changed along the way, and how decisions got made across brand, product, and web.",
      "Placeholder paragraph four: outcomes and what this work set up for the team going forward.",
    ],
    Icon: IconBolt,
    screens: [
      {
        id: "branding",
        label: "Logo & Branding",
        Icon: IconImage,
        media: { type: "image", src: roboroBrandingImg },
        description: "Designed Roboro's brand identity from the ground up, including the logo mark and a full color token system.",
      },
      {
        id: "website-design-build",
        label: "Website Design & Build",
        Icon: IconLayout,
        media: { type: "image", src: roboroWebsiteHeroImg },
        description: "Designed and built the marketing site's hero section, from Figma concept through production-ready code.",
      },
      {
        id: "website-landing-page",
        label: "Website Landing Page",
        Icon: IconWindow,
        media: { type: "video", src: roboroLandingPageVideo },
        description: "The finished landing page live in the browser, showcasing Roboro's real-time legislative alerts.",
      },
      {
        id: "product-bills",
        label: "Product Design: Bills",
        Icon: IconSliders,
        media: { type: "image", src: roboroBillsImg },
        description: "Designed the bill-tracking interface, surfacing priority, sponsors, and status at a glance across every tracked bill.",
      },
      {
        id: "product-calendar",
        label: "Product Design: Calendar",
        Icon: IconCalendar,
        media: { type: "image", src: roboroCalendarImg },
        description: "Designed the legislative calendar, giving users a clear view of upcoming and past committee events and bill actions.",
      },
    ],
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
    roleDetails: [
      "Placeholder role notes for Visier — real copy coming soon. This panel will hold the fuller narrative about scope, ownership, and impact for this engagement, beyond what the one-line summary and tech chips above can carry.",
      "Placeholder paragraph two: context on how the work started, who was involved, and what the initial goals were before the redesign took its current shape.",
      "Placeholder paragraph three: the day-to-day of the role — what shipped, what changed along the way, and how decisions got made across design and engineering.",
      "Placeholder paragraph four: outcomes and what this work set up for the team going forward.",
    ],
    Icon: IconCompass,
    screens: [
      {
        id: "website-hero",
        label: "Website Redesign / Hero",
        Icon: IconWindow,
        media: { type: "video", src: visierHeroVideo },
        description: "Redesigned Visier.com's hero, bringing the new brand and design system to the site's front door.",
      },
      {
        id: "platform-ui",
        label: "Interactive Platform UI w/ Animation",
        Icon: IconSliders,
        media: { type: "video", src: visierPlatformVideo },
        description: "Designed an interactive platform UI with Framer Motion animation, showing the product's insights in motion rather than a static screenshot.",
      },
      {
        id: "ai-agent-hero",
        label: "AI Agent Rive Animated Hero",
        Icon: IconBolt,
        media: { type: "video", src: visierVeeVideo },
        description: "Designed and animated the AI agent's hero moment in Rive, introducing Visier's AI assistant on the site.",
      },
      {
        id: "product-library",
        label: "Product Library UI",
        Icon: IconLayers,
        media: { type: "image", src: visierProductLibraryImg },
        description: "Designed the product UI library, from resignation-rate trends to predictive risk scoring, as a system of reusable data components.",
      },
    ],
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
    roleDetails: [
      "Placeholder role notes for Atlantic Fertility & Shared Beginnings — real copy coming soon. This panel will hold the fuller narrative about scope, ownership, and impact for this engagement, beyond what the one-line summary and tech chips above can carry.",
      "Placeholder paragraph two: context on how the work started, who was involved, and what the initial goals were before the two brands and sites took their current shape.",
      "Placeholder paragraph three: the day-to-day of the role — what shipped, what changed along the way, and how decisions got made across brand and web.",
      "Placeholder paragraph four: outcomes and what this work set up going forward.",
    ],
    Icon: IconLayers,
    screens: [
      {
        id: "atlantic-brand",
        label: "Atlantic's Brand",
        Icon: IconImage,
        media: { type: "image", src: atlanticBrandImg },
        description: "Designed Atlantic Fertility's brand identity, from the logo mark through a full color palette.",
      },
      {
        id: "atlantic-web",
        label: "Atlantic's Web",
        Icon: IconWindow,
        media: { type: "video", src: atlanticWebVideo },
        description: "Designed and built Atlantic Fertility's website, bringing the new brand to life in Framer.",
      },
      {
        id: "shared-beginnings-brand",
        label: "Shared Beginnings' Brand",
        Icon: IconImage,
        media: { type: "image", src: sharedBeginningsBrandImg },
        description: "Designed Shared Beginnings' brand identity, from the logo mark through a full color palette.",
      },
      {
        id: "shared-beginnings-web",
        label: "Shared Beginnings' Web",
        Icon: IconWindow,
        media: { type: "video", src: sharedBeginningsWebVideo },
        description: "Designed and built Shared Beginnings' website, bringing the new brand to life in Framer.",
      },
    ],
  },
];
