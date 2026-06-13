import "./PaperContainer.css";

export default function PaperContainer({ children, className }) {
  return (
    <section className={`torn-paper ${className}`}>
      <svg className="torn-paper__defs" aria-hidden="true" focusable="false">
        <filter id="paper-tear" x="-15%" y="-15%" width="130%" height="130%">
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
          id="paper-tear-edge"
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
