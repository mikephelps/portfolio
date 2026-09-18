export type SkillGroup = {
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Design & UX",
    items: ["Product design", "UX research", "Interaction design", "Design systems"],
  },
  {
    label: "Craft",
    items: ["Prototyping", "Motion design", "Accessibility", "Figma"],
  },
  {
    label: "Front-end",
    items: ["TypeScript", "React", "Framer Motion", "Three.js / WebGL"],
  },
  {
    label: "Tools",
    items: ["Git", "Docker", "CI/CD", "Vercel / AWS"],
  },
];
