import { useId } from "react";
import "./PaperContainer.css";

export default function PaperContainer({ children, className = "" }) {
  const uniqueId = useId();
  const idSafe = uniqueId.replace(/:/g, "-");

  const filterId = `paper-tear-${idSafe}`;
  const filterEdgeId = `paper-tear-edge-${idSafe}`;

  return (
    <section
      className={`torn-paper ${className}`}
      style={{
        "--filter-tear": `url(#${filterId})`,
        "--filter-tear-edge": `url(#${filterEdgeId})`,
      }}
    >
      <svg className="torn-paper__defs" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId} x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.014 0.018"
              numOctaves="4"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="22"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <filter id={filterEdgeId} x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02 0.025"
              numOctaves="4"
              seed="31"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="28"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="torn-paper__sheet" aria-hidden="true" />
      <div className="torn-paper__inner">{children}</div>
    </section>
  );
}