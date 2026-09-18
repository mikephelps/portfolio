type IconProps = {
  size?: number;
  strokeWidth?: number;
};

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconAbout({ size = 18, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M4.8 20c1.2-3.8 4-5.6 7.2-5.6s6 1.8 7.2 5.6" />
    </svg>
  );
}

export function IconProjects({ size = 18, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.4" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.4" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.4" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.4" />
    </svg>
  );
}

export function IconContact({ size = 18, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth}>
      <rect x="3" y="5" width="18" height="14" rx="2.2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function IconDownload({ size = 18, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth}>
      <path d="M12 3.5v11" />
      <path d="m7 10 5 5 5-5" />
      <path d="M4.5 18.5v1.2a1.8 1.8 0 0 0 1.8 1.8h11.4a1.8 1.8 0 0 0 1.8-1.8v-1.2" />
    </svg>
  );
}

export function IconArrowUpRight({ size = 18, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

export function IconGithub({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 19 19" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844"
      />
    </svg>
  );
}

export function IconLinkedin({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.94 8.5H3.56V20.4h3.38zm.24-3.63a1.96 1.96 0 1 0-3.92.02 1.96 1.96 0 0 0 3.92-.02M20.4 20.4h.01v-6.35c0-3.1-.67-5.5-4.3-5.5-1.74 0-2.91.96-3.39 1.86h-.05V8.5H9.44c.05 1.02 0 11.9 0 11.9h3.38v-6.64c0-.36.03-.71.13-.96.29-.71.95-1.45 2.05-1.45 1.45 0 2.03 1.1 2.03 2.72v6.33z" />
    </svg>
  );
}

export function IconLayers({ size = 18, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth}>
      <path d="m12 3 8.5 4.9L12 12.8 3.5 7.9 12 3Z" />
      <path d="m3.5 12 8.5 4.9L20.5 12" />
      <path d="m3.5 16.1 8.5 4.9 8.5-4.9" />
    </svg>
  );
}

export function IconBolt({ size = 18, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth}>
      <path d="M12.5 3 5 13.5h5.5L11 21l7.5-10.5H13z" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCompass({ size = 18, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m14.8 9.2-2 5.6-5.6 2 2-5.6z" strokeLinejoin="round" />
    </svg>
  );
}

export function IconWindow({ size = 18, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth}>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M3 9h18" />
      <path d="M7 6.7h.01M10 6.7h.01" />
    </svg>
  );
}

export function IconImage({ size = 18, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m4.5 16.5 4.5-4.5 3 3 3.5-4.5 5 6" />
    </svg>
  );
}

export function IconSliders({ size = 18, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth}>
      <path d="M4 6h9M17 6h3M4 12h3M9 12h11M4 18h13M21 18h-2" />
      <circle cx="13" cy="6" r="2" />
      <circle cx="7" cy="12" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  );
}

export function IconLayout({ size = 18, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={strokeWidth}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 4v16" />
    </svg>
  );
}

export function IconMenu({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.7}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function IconClose({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={1.7}>
      <path d="m5 5 14 14" />
      <path d="m19 5-14 14" />
    </svg>
  );
}
