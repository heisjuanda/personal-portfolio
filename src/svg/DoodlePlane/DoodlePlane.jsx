export default function DoodlePlane({ className = "", color = "#1e1e1e" }) {
    return (
      <svg 
        viewBox="0 0 850 380" 
        fill="none" 
        className={className}
        aria-hidden="true"
      >
        <g stroke={color} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 45 270 L 120 360" />
          <path d="M 115 260 L 50 368" />
  
          <path d="M 145 288 L 155 268 L 165 286 L 175 266" />
          <path d="M 195 258 L 199 254" />
          <path d="M 215 248 L 225 230 L 235 246 L 245 226" />
          <path d="M 265 220 L 269 216" />
          <path d="M 285 208 C 305 190, 330 188, 355 198" />
          <path d="M 378 193 L 382 189" />
          <path d="M 400 186 L 410 168 L 420 186 L 430 168" />
          <path d="M 452 163 L 456 159" />
          <path d="M 475 154 C 493 140, 513 140, 533 150" />
          <path d="M 552 144 L 556 140" />
  
          <path d="M 575 136 
                   C 590 80, 610 185, 625 85 
                   C 635 175, 605 65, 645 155 
                   C 655 80, 620 170, 638 95 
                   C 650 160, 662 90, 670 135" />
  
          <path d="M 688 114 L 692 110" />
          <path d="M 700 102 L 708 86 L 716 100 L 724 84" />
  
          <path d="M 708 73 
                   C 700 70, 700 64, 708 62 
                   L 792 50 
                   C 815 48, 830 58, 824 70 
                   C 818 80, 792 86, 712 80 Z" />
  
          <path d="M 748 56 
                   C 738 32, 730 10, 742 7 
                   C 755 4, 765 24, 768 53" />
  
          <path d="M 750 78 
                   C 746 105, 738 132, 750 135 
                   C 763 138, 770 110, 768 76" />
  
          <path d="M 708 64 
                   C 696 50, 688 46, 692 56 
                   C 695 63, 700 68, 705 70" />
  
          <path d="M 708 78 
                   C 698 90, 692 94, 695 86 
                   C 698 80, 702 78, 705 77" />
  
          <path d="M 798 58 
                   C 792 54, 802 52, 808 57 
                   C 812 62, 802 64, 798 58 Z" />
        </g>
      </svg>
    );
  }