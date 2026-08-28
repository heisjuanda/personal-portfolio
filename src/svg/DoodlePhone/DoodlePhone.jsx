/** Marker-drawn phone. */
export default function DoodlePhone({ className = "", color = "currentColor" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 35 13 C 31 13, 29 16, 29 20 L 28 80 C 28 84, 30 87, 34 87 L 66 88 C 70 88, 72 85, 72 81 L 73 21 C 73 17, 71 14, 67 14 Z" />
        <path d="M 44 25 L 57 25" />
        <circle cx="50" cy="76" r="4" fill={color} />
      </g>
    </svg>
  );
}
