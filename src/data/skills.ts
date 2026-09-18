export type SkillGroup = {
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Engineering",
    items: ["TypeScript", "React", "Node.js", "GraphQL", "PostgreSQL"],
  },
  {
    label: "Design",
    items: ["Product design", "Design systems", "Motion design", "Figma"],
  },
  {
    label: "3D & Motion",
    items: ["Three.js", "WebGL / GLSL", "Framer Motion"],
  },
  {
    label: "Tools",
    items: ["Git", "Docker", "CI/CD", "Vercel/AWS"],
  },
];
