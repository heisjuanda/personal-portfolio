/**
 * Headphones drawn in the same hand-made line style as DoodleHeadset, cropped
 * to work as an icon. The "off" state crosses them out instead of swapping to
 * a different symbol, so the two states read as the same object.
 */
export default function DoodleSound({ className = "", color = "#1e1e1e", isOn = false }) {
  return (
    <svg
      viewBox="10 55 340 265"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 62 165 C 50 70, 210 15, 305 150" />
        <path d="M 85 160 C 78 88, 195 38, 282 152" />

        <path d="M 68 152
                 C 32 150, 22 210, 32 245
                 C 45 280, 95 278, 100 235
                 C 105 190, 92 154, 68 152 Z" />
        <path d="M 58 208 C 52 200, 72 192, 74 208 C 76 220, 56 222, 58 208 Z" fill={color} />

        <path d="M 285 158
                 C 255 165, 248 230, 258 270
                 C 268 305, 318 302, 322 260
                 C 328 215, 312 155, 285 158 Z" />
        <path d="M 282 225 C 276 215, 296 210, 298 225 C 300 238, 280 238, 282 225 Z" fill={color} />

        {!isOn && <path d="M 34 292 C 120 230, 230 150, 322 78" strokeWidth="18" />}
      </g>
    </svg>
  );
}
