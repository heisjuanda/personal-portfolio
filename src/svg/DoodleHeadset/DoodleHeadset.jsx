export default function DoodleHeadset({ className = "", color = "#1e1e1e" }) {
    return (
      <svg 
        viewBox="0 0 600 300" 
        fill="none" 
        className={className}
        aria-hidden="true"
      >
        <g stroke={color} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
          
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
  
          <path d="M 378 95 C 362 82, 362 60, 380 60 C 395 60, 395 82, 375 92 C 360 102, 355 125, 375 128 C 390 128, 395 110, 382 105 C 378 102, 372 106, 375 110" />
          <path d="M 382 35 L 378 135 C 378 148, 365 152, 360 142" />
  
          <path d="M 420 52 L 420 88" />
          <circle cx="410" cy="88" r="8" fill={color} />
          <path d="M 420 52 C 430 58, 435 68, 432 78" />
  
          <circle cx="438" cy="100" r="4" fill={color} />
  
          <path d="M 465 58 L 465 92" />
          <circle cx="456" cy="92" r="7" fill={color} />
          <path d="M 495 48 L 495 82" />
          <circle cx="486" cy="82" r="7" fill={color} />
          <path d="M 465 58 L 495 48" strokeWidth="12" />
  
          <path d="M 525 60 L 525 90" />
          <circle cx="516" cy="90" r="6" fill={color} />
          <path d="M 555 35 L 555 65" />
          <circle cx="546" cy="65" r="6" fill={color} />
          <path d="M 580 30 L 580 60" />
          <circle cx="571" cy="60" r="6" fill={color} />
          <path d="M 525 60 L 580 30" strokeWidth="10" />
          <path d="M 525 72 L 580 42" strokeWidth="10" />
        </g>
      </svg>
    );
  }