export default function DoodleCompass({ className = "", color = "currentColor" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 50 11 C 72 11, 89 28, 89 50 C 89 72, 72 89, 50 89 C 28 89, 11 72, 11 50 C 11 29, 27 12, 52 12" />
        <path d="M 50 25 L 62 50 L 38 50 Z" fill={color} />
        <path d="M 38 50 L 50 75 L 62 50" />
      </g>
    </svg>
  );
}
