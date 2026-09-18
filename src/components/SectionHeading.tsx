import Reveal from "./Reveal";
import "./SectionHeading.css";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
};

export default function SectionHeading({ index, eyebrow, title }: SectionHeadingProps) {
  return (
    <Reveal className="section-heading">
      <span className="section-heading-index">{index}</span>
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="section-heading-title">{title}</h2>
      </div>
    </Reveal>
  );
}
