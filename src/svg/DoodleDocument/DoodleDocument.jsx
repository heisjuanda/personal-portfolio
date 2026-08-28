export default function DoodleDocument({ className = "", color = "currentColor" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 27 13 L 61 13 L 79 31 L 78 87 L 26 86 Z" />
        <path d="M 60 14 L 61 31 L 79 31" />
        <path d="M 38 46 L 67 46" />
        <path d="M 38 58 L 67 58" />
        <path d="M 38 70 L 57 70" />
      </g>
    </svg>
  );
}
