export default function DoodleBriefcase({ className = "", color = "currentColor" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 39 32 C 39 22, 43 18, 50 18 C 57 18, 61 22, 61 33" />
        <path d="M 17 34 L 83 33 L 85 80 L 16 81 Z" />
        <path d="M 16 54 L 85 53" />
        <path d="M 43 47 L 58 47 L 58 60 L 43 60 Z" />
      </g>
    </svg>
  );
}
