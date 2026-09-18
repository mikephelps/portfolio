type LogoProps = {
  size?: number;
  className?: string;
};

export default function Logo({ size = 26, className }: LogoProps) {
  return (
    <svg
      className={className}
      width={size}
      height={(size * 66) / 68}
      viewBox="0 0 68 66"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Monogram logo"
    >
      <path
        d="M 33.853 51.455 L 0 0.509 L 0 65.968 L 5.073 65.968 L 5.073 17.215 L 34.024 60.911 L 37.039 56.254 L 33.976 51.642 Z M 68 0.366 L 39.89 42.51 L 15.021 5.086 L 53.293 5.086 L 37.921 29.008 L 40.987 33.623 L 62.597 0 L 5.755 0 L 36.985 46.995 L 37.953 48.451 L 40.048 51.607 L 62.318 17.215 L 62.93 66 L 68 65.936 Z"
        fill="currentColor"
      />
    </svg>
  );
}
