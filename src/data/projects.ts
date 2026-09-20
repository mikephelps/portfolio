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
      "Co-lead the design system foundation with tokens, colors system, and initial components. Introduced design engineering workflow with Claude/Copilot to build and ship projects directly to AEM.",
    tech: ["Figma", "Design Systems", "AEM", "Claude", "HTML", "CSS", "GitHub"],
    roleDetails: [
      "Before I stepped in, LinkedIn's brand had gone through a rebrand with no system built to carry it on the web side. I co-led the effort to build one from the ground up: token architecture, the brand color system, and the initial component library. I audited 25+ high traffic page templates to find which patterns were actually reused across the site, and that audit became the foundation for what got systemized first. I helped run the weekly stand-ups and office hours that kept the broader design team working from the same source of truth, and I produced a 60-page standards and guidelines document for external agencies so the system could hold up outside our own team too.",
      "That foundation grew into 70+ raw color primitives and 110 semantic web tokens, covering light and dark mode, with full documentation on contrast, accessibility, links, text over imagery, status, and accent usage. Alongside that, I co-led the build-out of new custom components: heroes, cards, features, banners, the elements that show up everywhere on the site, each with variants and mobile representations, built off an audit of the patterns already in production.",
      "Along the way, I saw where the real risk was. I put together a Current State / Future State proposal calling out the gaps in our brand release process and in AEM build quality, and used it to get organizational buy-in to shift the team toward a design-system-driven model instead of one-off builds inside of AEM. That proposal, plus a full CMS and design system audit, became the blueprints and roadmap for the system's first iteration.",
      "The part I'm proudest of came after the foundation was in place. I advocated internally to get Claude Code and Cursor into the design team's hands, then built the workflow around it: Figma's MCP wired to a GitHub design system, so AI-generated web experiences stay tied to the actual tokens and components instead of drifting from them. I used that workflow myself to ship color tokens, responsive typography classes, and custom components, including a Lottie animation, an FAQ accordion, and banners, directly into AEM, working PRs with engineering the whole way and refining the workflow as I went.",
      "With that same AI-assisted workflow, I worked directly with the SEO team to deliver org-level and page-level structured data schema to AEM, taking schema coverage from 5% to 95% across 4,000+ pages, then followed it with custom components that carried their own schema. I was the first on the team to set up a full local development environment with Claude, Cursor, and MCP tooling, put together demos of a live component build that were featured in a company-wide town hall.",
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
        label: "AI Workflow & AI Design System",
        Icon: IconBolt,
        media: { type: "image", src: linkedinAiWorkflowImg },
        description:
          "Advocated for internal AI tools (Claude Code, Cursor) and created a workflow for designers working in Figma. Utilized Figma's MCP to create a design system in GitHub for AI generated web experiences that is directly wired to the design system. Introduced a design engineering workflow using Claude Code/Copilot to build directly to AEM.",
      },
      {
        id: "aem-tokens-components",
        label: "AEM: Custom Tokens & Components",
        Icon: IconLayers,
        media: { type: "image", src: linkedinAemTokensComponentsImg },
        description:
          "Using Claude Code & Copilot, I shipped the addition of color tokens, responsive typography classes, and created custom components: lottie animation, FAQ accordion, banners. I worked directly with engineering on PRs and refining the skills behind the AI engineering workflow.",
      },
      {
        id: "aem-code-seo",
        label: "AEM: Custom Code & SEO",
        Icon: IconWindow,
        media: { type: "image", src: linkedinAemCodeSeoImg },
        description:
          "With AI code assistance, I worked directly with the SEO team to quickly deliver org-level and page-level structured data schema to AEM — lifting schema coverage from 5% to 95% across 4,000+ pages. Then quickly followed with creating custom components with additional schema.",
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
      "Roboro is an AI-based legislation tracking platform built for law and lobbying firms, and when I came on there wasn't a brand, a website, or a product design system yet. I own the design work end to end here: brand, web, and product, with nobody else to hand pieces off to. That meant every decision, from the logo to the color tokens to the calendar screen a user checks fifty times a day, ran through the same person.",
      "I designed Roboro's brand identity from the ground up, including the logo mark and a full color token system built to hold up across marketing, web, and product from day one.",
      "From there I designed and built the full web experience myself, starting in Figma and shipping a custom site in Framer with its own components and CMS collections to power dynamic content, so the team can update the site without touching design files.",
      "On top of the core site, I created 15+ landing pages for lead generation and event sign-ups, each with custom UI and animation built to drive engagement, wired directly to Mailchimp so every page ties straight into the funnel.",
      "The product side is its own build. Roboro's app helps law and lobbying firms track legislation and bills, and screens like Suggested Bills and Calendar are single pieces of a much larger product design. Calendar in particular carries a lot of dense, time-sensitive information, including custom labels that flag transcription status, so the real design problem was making complex data readable at a glance without losing any of it.",
      "None of that had a formal design system behind it at first. I designed to consistent, system-level standards before the product had matured enough to justify building one out. Once it did, I turned that same body of Figma work into an AI-driven design markdown system, and it's grown past Bills and Calendar. That system now powers other designs and products across the org.",
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
        description:
          "Designed and built the full web experience. From Figma design concept to custom website in Framer with custom components and CMS collections to power dynamic content.",
      },
      {
        id: "website-landing-page",
        label: "Website Landing Page(s)",
        Icon: IconWindow,
        media: { type: "video", src: roboroLandingPageVideo },
        description:
          "Created 15+ landing pages for lead generation and to promote event sign-ups. Created custom UI and animations to drive engagement and wired to Mailchimp.",
      },
      {
        id: "product-bills",
        label: "Product Design: Bills",
        Icon: IconSliders,
        media: { type: "image", src: roboroBillsImg },
        description:
          "This 'Suggested Bills' is just one screen of an entire product app design. The product was designed with best practices but a design system wasn't made until the product's maturity had reached the right level. The Figma served an AI-driven design markdown system to power other designs and products for the org.",
      },
      {
        id: "product-calendar",
        label: "Product Design: Calendar",
        Icon: IconCalendar,
        media: { type: "image", src: roboroCalendarImg },
        description:
          "This 'Calendar' screen is one aspect of a more complex product app design. The calendar page includes many features and includes a lot of important information that needs to be viewed at a glance, including custom labels to flag transcription status. This app's success is all about simplifying complex data.",
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
      "At Visier, I led a full redesign of the main .com experience, built around a new design system, working directly with engineering the entire way. Part of that meant pushing new tech into a company that hadn't used it before: Rive and Framer Motion animation, brought in to make the site feel like the product it was selling instead of a static brochure.",
      "The redesign itself covered hundreds of pages with reusable templates and ended up with roughly 80 custom components, all built on React and backed by an IA I worked through with stakeholders in dedicated workshops rather than handing them a nav structure to sign off on. Underneath it, I built the component-based design system that extends Visier's brand and visual identity across multiple digital domains, standards and guidelines included.",
      "That system did real work. The persona-based homepage redesign built on it cut bounce and drop-off by about 25%, and the resource landing pages I redesigned the same way contributed to 20% year-over-year growth in organic and direct conversions.",
      "Product marketing wanted a way to tell the platform's story visually, so I worked directly with subject matter experts to build a scroll-triggered interactive experience using multiple Rive animations, engineered to keep an extremely small file footprint so it never slowed the page down.",
      "When Visier introduced its AI assistant, I partnered with product and product marketing to design and animate its hero moment in Rive, then built out the experience below the fold that walks through the agent's capabilities, prototyping the custom components for it in Figma first.",
      "Visier's product itself was detailed enough that it didn't translate well to a marketing audience, so I took the initiative to fix that myself. I redesigned the key product moments into a shared Figma library of 200+ custom UI images, now used across the website and pulled directly into the branding team's collateral.",
      "Underneath all of it, I optimized how the team actually produced these assets, cutting request-to-launch time by about 50%.",
    ],
    Icon: IconCompass,
    screens: [
      {
        id: "website-hero",
        label: "Full Website Redesign",
        Icon: IconWindow,
        media: { type: "video", src: visierHeroVideo },
        description:
          "This hero is just a small representation of a full redesign of the main .com site for Visier. This hero features custom lottie animation. The website had ~80 custom components and hundreds of pages with templates for reusable pages. Built on React and included a stakeholder workshopped IA for navigation.",
      },
      {
        id: "platform-ui",
        label: "Interactive Platform UI w/ Animation",
        Icon: IconSliders,
        media: { type: "video", src: visierPlatformVideo },
        description:
          "The product marketing team wanted to come up with a visual story for the platform. I worked directly with subject matter experts to create a scroll-trigger interactive experience with multiple Rive animations, built to have an extremely small file output footprint.",
      },
      {
        id: "ai-agent-hero",
        label: "AI Agent Rive Animated Hero",
        Icon: IconBolt,
        media: { type: "video", src: visierVeeVideo },
        description:
          "I partnered with product and product marketing to design and animate the AI agent's hero moment in Rive, introducing Visier's AI assistant on the site. Below the fold was an experience that detailed the agent's capabilities with custom components that I designed prototypes for in Figma.",
      },
      {
        id: "product-library",
        label: "Product Library UI",
        Icon: IconLayers,
        media: { type: "image", src: visierProductLibraryImg },
        description:
          "Visier's product was very detailed and didn't cater well on the marketing front. So I took the initiative to redesign key product moments in a library that was over 200 custom UI images that were used all over the website and that the branding team used in their collateral, all from a shared Figma library.",
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
      "Atlantic Fertility and Shared Beginnings are sister fertility businesses, and I took on their full rebrand and website redesign as side projects that grew into more than a year of work, done solo, start to finish. Both sites had the same problem: overloaded page counts, walls of dense text, and stock photography that looked a decade out of date, all wrapped around one of the most emotionally sensitive decisions a couple can make. My job was to take that experience and make it feel approachable instead of clinical, for people already carrying enough weight just getting through the door.",
      "Atlantic's brand needed to start over completely. I built the new logo, then everything underneath it: guidelines, photography direction and selection, a full color palette with tints and shades, custom icons and illustrations, and the brand's character, personality, traits, and tone from scratch.",
      "For the website, I worked with an agency on the architecture, and together we rebuilt the IA and rewrote every piece of web copy. I designed straight into the web build platform and CMS for this one rather than handing off static comps, building custom components, program page templates, and interactivity everywhere it earned its place.",
      "Shared Beginnings needed the same ground-up treatment. I built its new logo, guidelines, photography direction and selection, full color palette with tints and shades, custom icons and illustrations, and its own distinct brand character, personality, traits, and tone, built separately from Atlantic's even though the two businesses are related.",
      "The web goal here was different: bring in a human touch. The brand shows up in every corner of the experience, down to premium components that add soft brand moments to things as ordinary as pricing comparison cards. Where the old site was cluttered and confusing, the redesign simplifies those same moments without losing any of the warmth the brand was built to carry.",
      "Both projects took over a year and I built them entirely on my own. The clients were ecstatic with the result then, and still is now.",
    ],
    Icon: IconLayers,
    screens: [
      {
        id: "atlantic-brand",
        label: "Atlantic's Brand",
        Icon: IconImage,
        media: { type: "image", src: atlanticBrandImg },
        description:
          "Atlantic's presence sorely needed a new brand. I put together not just a new logo but guidelines, photography direction and selection, full color palette with tints and shades, custom icons and illustrations, as well as building out the full brand character / personality / traits / tone.",
      },
      {
        id: "atlantic-web",
        label: "Atlantic's Web",
        Icon: IconWindow,
        media: { type: "video", src: atlanticWebVideo },
        description:
          "I worked with an agency to build the architecture of this newly redesigned site. We together built a new IA and full rewrite of all web copy. For this one, I designed straight into the web CMS. Custom components, program page templates, and interactivity wherever it was necessary.",
      },
      {
        id: "shared-beginnings-brand",
        label: "Shared Beginnings' Brand",
        Icon: IconImage,
        media: { type: "image", src: sharedBeginningsBrandImg },
        description:
          "Shared Beginnings' also needed a new brand direction. Exactly like Atlantic, I put together a new logo, guidelines, photography direction and selection, full color palette with tints and shades, custom icons and illustrations, as well as building out the full brand character / personality / traits / tone.",
      },
      {
        id: "shared-beginnings-web",
        label: "Shared Beginnings' Web",
        Icon: IconWindow,
        media: { type: "video", src: sharedBeginningsWebVideo },
        description:
          "The goal for the web was to bring in a human touch. The brand shines through in every corner of this experience. There are premium components that add soft brand moments to things like pricing comparison cards. There are many UX moments that beautifully simplify a once cluttered, confusing experience.",
      },
    ],
  },
];
