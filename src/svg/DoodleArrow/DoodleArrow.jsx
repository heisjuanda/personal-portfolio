export default function DoodleArrow({ className = "", color = "#1e1e1e" }) {
    return (
      <svg 
        viewBox="0 0 500 550" 
        fill="none" 
        className={className}
        aria-hidden="true"
      >
        <path 
          d="M 20 45 C 80 30, 150 15, 205 30 C 250 42, 255 105, 215 108 C 175 110, 170 55, 205 32 C 250 10, 350 25, 415 90 C 455 130, 465 200, 430 245 C 395 285, 355 255, 360 200 C 365 150, 430 160, 445 220 C 460 280, 400 370, 315 435 M 285 395 L 270 495 L 395 430" 
          stroke={color} 
          strokeWidth="22" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    );
  }