export default function DoodlePerson({ className = "", color = "currentColor" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 50 18 C 60 18, 68 26, 68 36 C 68 46, 60 53, 50 53 C 39 53, 32 45, 32 35 C 32 25, 40 18, 51 19" />
        <path d="M 22 86 C 23 68, 34 60, 50 60 C 66 60, 77 68, 78 87" />
      </g>
    </svg>
  );
}
