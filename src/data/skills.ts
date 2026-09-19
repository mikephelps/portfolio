export type SkillCategory = {
  label: string;
  color: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    label: "Design",
    color: "#5a2cda",
    items: [
      "Figma",
      "Design Systems",
      "Interaction Design",
      "Wireframing",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe After Effects",
    ],
  },
  {
    label: "UX",
    color: "#ec4899",
    items: ["UX Research", "User Testing", "Prototyping", "Accessibility", "Hotjar"],
  },
  {
    label: "Dev",
    color: "#14b8a6",
    items: ["Front-End", "HTML", "CSS", "JS", "Vibe Coding"],
  },
  {
    label: "AI",
    color: "#3b82f6",
    items: ["Claude", "Copilot", "ChatGPT", "Fal"],
  },
  {
    label: "CMS",
    color: "#f97316",
    items: ["Sitecore", "Adobe Experience Manager", "Craft", "WordPress", "Framer", "Webflow"],
  },
  {
    label: "Animation",
    color: "#84cc16",
    items: ["Rive", "Lottie", "ThreeJS"],
  },
];

export type Skill = {
  name: string;
  category: string;
  color: string;
};

export const skills: Skill[] = skillCategories.flatMap((category) =>
  category.items.map((name) => ({ name, category: category.label, color: category.color })),
);
