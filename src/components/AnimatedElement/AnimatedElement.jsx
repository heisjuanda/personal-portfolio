import { SIDE } from "../../constants/constants";

import "./AnimatedElement.css";

export default function AnimatedElement({
  imageSrc,
  alt,
  side,
  onClick,
  value
}) {
  return (
    <div
      className={`animated-element animated-element--${side === SIDE.LEFT ? "left" : "right"}`}
    >
      <button
        className="animated-element__content"
        onClick={onClick}
        type="button"
        aria-label={`Learn more about ${alt}`}
        data-value={value}
      >
        <img
          src={imageSrc}
          alt={alt}
          loading="lazy"
          draggable={false}
          data-value={value}
          width={120}
          height={100}
        />
      </button>
    </div>
  );
}
