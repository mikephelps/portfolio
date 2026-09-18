export type ProjectImage = {
  caption: string;
};

export type Project = {
  id: string;
  index: string;
  year: string;
  title: string;
  role: string;
  description: string;
  tech: string[];
  link?: string;
  repo?: string;
  images: ProjectImage[];
};

export const projects: Project[] = [
  {
    id: "aperture",
    index: "01",
    year: "2025",
    title: "Aperture Analytics",
    role: "Full-stack engineer & product designer",
    description:
      "A real-time analytics dashboard for creative teams — designed and built end to end, from the streaming data pipeline to the easing curve on the last chart transition.",
    tech: ["TypeScript", "React", "Node.js", "PostgreSQL", "D3.js"],
    link: "#",
    repo: "#",
    images: [
      { caption: "Dashboard overview" },
      { caption: "Live chart detail" },
      { caption: "Team workspace" },
      { caption: "Mobile view" },
    ],
  },
  {
    id: "northwind",
    index: "02",
    year: "2024",
    title: "Northwind Commerce",
    role: "Frontend architecture & design system",
    description:
      "A headless commerce storefront paired with a component library built for speed — motion-first micro-interactions on top of a strict performance budget.",
    tech: ["Next.js", "GraphQL", "Framer Motion", "Design systems"],
    link: "#",
    images: [{ caption: "Storefront home" }, { caption: "Product detail" }],
  },
  {
    id: "orbit",
    index: "03",
    year: "2023",
    title: "Orbit Studio",
    role: "Solo builder",
    description:
      "A WebGL product configurator that lets users customize a physical product in real time, tweak materials, and export a shareable render.",
    tech: ["Three.js", "WebGL / GLSL", "React", "Zustand"],
    repo: "#",
    images: [
      { caption: "Configurator UI" },
      { caption: "Render export" },
      { caption: "Material picker" },
      { caption: "Share flow" },
    ],
  },
];
