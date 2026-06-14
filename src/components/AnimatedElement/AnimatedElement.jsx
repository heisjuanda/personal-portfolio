import { SIDE } from "../../constants/constants";

import "./AnimatedElement.css";

export default function AnimatedElement({
  imageSrc,
  alt,
  side,
  onClick,
  value,
}) {
  return (
    <div
      className={`animated-element animated-element--${side === SIDE.LEFT ? "left" : "right"}`}
    >
      <div className="animated-element__content" onClick={onClick}>
        <img
          src={imageSrc}
          alt={alt}
          loading="lazy"
          aria-label={alt}
          draggable={false}
          data-value={value}
        />
      </div>
    </div>
  );
}
