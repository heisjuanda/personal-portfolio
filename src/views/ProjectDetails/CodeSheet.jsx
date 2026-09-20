export default function CodeSheet({ sample, index }) {
  const prompt = sample.prompt ?? "-->";
  return (
    <figure className="pd-figure pd-figure--code">
      <div className="pd-tape pd-tape--top-right" />
      <div className="pd-codesheet">
        <div className="pd-codesheet__holes pd-codesheet__holes--left" aria-hidden="true" />
        <div className="pd-codesheet__holes pd-codesheet__holes--right" aria-hidden="true" />
        <div className="pd-codesheet__head">
          <span>{sample.title}</span>
          {sample.lang && <span className="pd-codesheet__lang">{sample.lang}</span>}
        </div>
        <pre className="pd-codesheet__pre" tabIndex="0">
          <code>
            {sample.lines.map((line, i) => (
              <span key={i} className={`pd-codesheet__line pd-codesheet__line--${line.kind}`}>
                {line.kind === "prompt" && <span className="pd-codesheet__prompt">{prompt} </span>}
                {line.text}
                {"\n"}
              </span>
            ))}
          </code>
        </pre>
      </div>
      <figcaption className="pd-figure__caption">
        <span className="pd-figure__label">FIG. {String(index).padStart(2, "0")}</span> {sample.caption ?? sample.title}
      </figcaption>
    </figure>
  );
}
