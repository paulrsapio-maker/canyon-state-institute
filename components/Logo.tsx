// Inline renditions of the CSI logo assets (public/csi-logo-*.svg) so text
// stays crisp and colors can flip for dark surfaces without extra requests.
import { useId } from "react";

function EmblemArt() {
  return (
    <>
      <circle cx="100" cy="78" r="30" fill="#E8A33D" />
      <path
        d="M-10 118 L34 118 L44 96 L74 96 L84 118 L120 118 L130 92 L162 92 L172 118 L210 118 L210 210 L-10 210 Z"
        fill="#C05B2B"
      />
      <path
        d="M-10 140 L28 140 L42 116 L70 116 L82 140 L118 140 L132 112 L160 112 L172 140 L210 140 L210 210 L-10 210 Z"
        fill="#A33E14"
      />
      <path
        d="M-10 164 L36 164 L52 138 L84 138 L98 164 L138 164 L152 136 L182 136 L196 164 L210 164 L210 210 L-10 210 Z"
        fill="#7A2E0E"
      />
      <path
        d="M100 210 C96 192 108 184 102 172 C98 164 104 158 100 150"
        fill="none"
        stroke="#F6E7D3"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.85"
      />
    </>
  );
}

export function LogoEmblem({
  className,
  ringColor = "#7A2E0E",
}: {
  className?: string;
  ringColor?: string;
}) {
  const clipId = useId();
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <circle cx="100" cy="100" r="92" />
        </clipPath>
      </defs>
      <circle cx="100" cy="100" r="97" fill="none" stroke={ringColor} strokeWidth="6" />
      <circle cx="100" cy="100" r="92" fill="#F6E7D3" />
      <g clipPath={`url(#${clipId})`}>
        <EmblemArt />
      </g>
    </svg>
  );
}

export function LogoHorizontal({
  reversed = false,
  withTagline = false,
  className,
}: {
  reversed?: boolean;
  withTagline?: boolean;
  className?: string;
}) {
  const clipId = useId();
  const primary = reversed ? "#F6E7D3" : "#3B2314";
  const accent = reversed ? "#E8A33D" : "#A33E14";
  const ring = reversed ? "#F6E7D3" : "#7A2E0E";
  const serif = "var(--font-source-serif), Georgia, 'Times New Roman', serif";
  return (
    // Full 200-unit height regardless of tagline — the emblem spans y 3–197,
    // so a shorter viewBox clips its bottom edge.
    <svg
      viewBox="0 0 860 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Canyon State Institute"
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="100" cy="100" r="92" />
        </clipPath>
      </defs>
      <circle cx="100" cy="100" r="97" fill="none" stroke={ring} strokeWidth="6" />
      <circle cx="100" cy="100" r="92" fill="#F6E7D3" />
      <g clipPath={`url(#${clipId})`}>
        <EmblemArt />
      </g>
      <text
        x="230"
        y={withTagline ? 92 : 106}
        fontFamily={serif}
        fontSize="52"
        fontWeight="bold"
        fill={primary}
        letterSpacing="1"
      >
        CANYON STATE
      </text>
      <text
        x="232"
        y={withTagline ? 138 : 152}
        fontFamily={serif}
        fontSize="34"
        fill={accent}
        letterSpacing="14"
      >
        INSTITUTE
      </text>
      {withTagline && (
        <>
          <line x1="232" y1="156" x2="828" y2="156" stroke="#C05B2B" strokeWidth="2" />
          <text
            x="232"
            y="180"
            fontFamily="var(--font-source-sans), Verdana, sans-serif"
            fontSize="15"
            fill={reversed ? "#D9BFA8" : "#6B4A32"}
            letterSpacing="5"
          >
            VETERAN OWNED · CAREER-FOCUSED EDUCATION
          </text>
        </>
      )}
    </svg>
  );
}
