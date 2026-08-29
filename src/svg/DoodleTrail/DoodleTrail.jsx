export default function DoodleTrail({ className = "", color = "currentColor" }) {
  return (
    <svg
      viewBox="0 0 100 140"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 22 6
           C 20 12, 24 16, 26 22
           C 32 38, 62 44, 72 66
           C 80 88, 42 90, 30 112
           C 26 122, 34 130, 44 134"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="7 5"
      />
    </svg>
  );
}
