import { SIDE } from '../../constants/constants';

import "./AnimatedElement.css";

export default function AnimatedElement({ imageSrc, alt, side }) {
  return (
    <div className={`animated-element animated-element--${side === SIDE.LEFT ? 'left' : 'right'}`}>
      <img src={imageSrc} alt={alt} loading="lazy" aria-label={alt} draggable={false} />
    </div>
  );
}
