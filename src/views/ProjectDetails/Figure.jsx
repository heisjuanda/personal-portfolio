import IMAGES from "../data/projects.images.js";
import useRevealOnView from "./useRevealOnView.js";

const IMAGE_ROOT = "/images/projects";

export function imageSources(key) {
  const entry = IMAGES[key];
  if (!entry) return null;
  const [id, name] = key.split("/");
  const file = (w) => `${IMAGE_ROOT}/${id}/${name}-${w}.avif`;
  const largest = entry.sizes.at(-1);
  const preferred = entry.sizes.includes(1024) ? 1024 : largest;
  return {
    src: file(preferred),
    srcSet: entry.sizes.map((w) => `${file(w)} ${w}w`).join(", "),
    full: file(largest),
    width: entry.width,
    height: entry.height,
  };
}

/**
 * A screenshot pinned into the dossier. `frame` draws the device around it:
 * browser (title bar + url), phone (bezel + notch), terminal, or paper (none).
 * The image loads grey and turns to colour when it scrolls into view.
 */
export default function Figure({
  figure,
  index,
  sizes = "(max-width: 768px) 100vw, 60vw",
  eager = false,
  onOpen,
  className = "",
}) {
  const [ref, revealed] = useRevealOnView();
  const img = imageSources(figure.src);
  if (!img) return null;

  const frame = figure.frame ?? "paper";
  const label = `FIG. ${String(index).padStart(2, "0")}`;

  return (
    <figure
      ref={ref}
      className={`pd-figure pd-figure--${frame}${revealed ? " is-revealed" : ""} ${className}`}
    >
      <div className="pd-tape pd-tape--top-left" />
      <div className="pd-tape pd-tape--top-right" />

      <div className="pd-figure__frame">
        {frame === "browser" && (
          <div className="pd-figure__chrome" aria-hidden="true">
            <span /><span /><span />
            {figure.url && <em>{figure.url}</em>}
          </div>
        )}
        {frame === "phone" && <div className="pd-figure__notch" aria-hidden="true" />}
        {frame === "terminal" && (
          <div className="pd-figure__chrome pd-figure__chrome--dark" aria-hidden="true">
            <span /><span /><span />
            {figure.url && <em>{figure.url}</em>}
          </div>
        )}

        <button
          type="button"
          className="pd-figure__zoom"
          onClick={onOpen ? () => onOpen({ ...figure, ...img }) : undefined}
          aria-label={`Open ${figure.caption ?? figure.alt} at full size`}
        >
          <img
            src={img.src}
            srcSet={img.srcSet}
            sizes={sizes}
            width={img.width}
            height={img.height}
            alt={figure.alt}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : undefined}
            decoding="async"
          />
        </button>
      </div>

      <figcaption className="pd-figure__caption">
        <span className="pd-figure__label">{label}</span> {figure.caption}
      </figcaption>
    </figure>
  );
}
