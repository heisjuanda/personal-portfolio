import { useId, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./PaperContainer.css";

export default function PaperContainer({ children, className }) {
  const uniqueId = useId();
  const location = useLocation();
  const [filterBase, setFilterBase] = useState("");

  useEffect(() => {
    setFilterBase(window.location.href.split("#")[0]);
  }, [location]);

  const idSafe = uniqueId.replace(/:/g, "-");
  const filterId = `paper-tear-${idSafe}`;
  const filterEdgeId = `paper-tear-edge-${idSafe}`;

  const paperTear = `url(${filterBase}#${filterId})`;
  const paperTearEdge = `url(${filterBase}#${filterEdgeId})`;

  return (
    <section
      className={`torn-paper ${className}`}
      style={{
        "--filter-tear": paperTear,
        "--filter-tear-edge": paperTearEdge,
      }}
    >
      <svg className="torn-paper__defs" aria-hidden="true" focusable="false">
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
        <filter
          id={filterEdgeId}
          x="-15%"
          y="-15%"
          width="130%"
          height="130%"
        >
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
      </svg>

      <div className="torn-paper__sheet" aria-hidden="true"></div>

      <div className="torn-paper__inner">{children ? children : <></>}</div>
    </section>
  );
}
