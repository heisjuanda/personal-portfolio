const NODE_W = 212;
const NODE_H = 76;
const COL_GAP = 78;
const ROW_GAP = 28;
const PAD = 24;

function layout(columns) {
  const positions = new Map();
  const rows = Math.max(...columns.map((c) => c.length));
  const height = rows * NODE_H + (rows - 1) * ROW_GAP + PAD * 2;
  columns.forEach((col, ci) => {
    const colHeight = col.length * NODE_H + (col.length - 1) * ROW_GAP;
    const top = (height - colHeight) / 2;
    col.forEach((node, ri) => {
      positions.set(node.id, {
        x: PAD + ci * (NODE_W + COL_GAP),
        y: top + ri * (NODE_H + ROW_GAP),
        ...node,
      });
    });
  });
  const width = PAD * 2 + columns.length * NODE_W + (columns.length - 1) * COL_GAP;
  return { positions, width, height };
}

function edgePath(a, b) {
  if (a.x === b.x) {
    const down = b.y > a.y;
    const x = a.x + NODE_W / 2;
    const y1 = down ? a.y + NODE_H : a.y;
    const y2 = down ? b.y : b.y + NODE_H;
    return { d: `M ${x} ${y1} L ${x} ${y2}`, mid: [x + 12, (y1 + y2) / 2 + 5], anchor: "start" };
  }
  const forward = b.x > a.x;
  const x1 = forward ? a.x + NODE_W : a.x;
  const x2 = forward ? b.x : b.x + NODE_W;
  const y1 = a.y + NODE_H / 2;
  const y2 = b.y + NODE_H / 2;
  const cx = (x1 + x2) / 2;
  return {
    d: `M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`,
    mid: [cx, (y1 + y2) / 2 - 10],
  };
}

export default function Diagram({ spec, index }) {
  const { positions, width, height } = layout(spec.columns);
  const titleId = `pd-diagram-title-${index}`;
  const descId = `pd-diagram-desc-${index}`;
  const description =
    spec.description ??
    spec.edges
      .map(([from, to, label]) => {
        const a = positions.get(from)?.label;
        const b = positions.get(to)?.label;
        return label ? `${a} → ${b} (${label})` : `${a} → ${b}`;
      })
      .join("; ");

  return (
    <figure className="pd-figure pd-figure--diagram">
      <div className="pd-tape pd-tape--top-left" />
      <div className="pd-tape pd-tape--bottom-right" />
      <div className="pd-diagram blueprint-bg">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
          className="pd-diagram__svg"
          style={{ aspectRatio: `${width} / ${height}` }}
        >
          <title id={titleId}>{spec.title}</title>
          <desc id={descId}>{description}</desc>
          <defs>
            <marker id={`arrow-${index}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 1 1 L 9 5 L 1 9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>

          <g className="pd-diagram__edges">
            {spec.edges.map(([from, to, label], i) => {
              const a = positions.get(from);
              const b = positions.get(to);
              if (!a || !b) return null;
              const { d, mid, anchor = "middle" } = edgePath(a, b);
              return (
                <g key={`${from}-${to}-${i}`}>
                  <path d={d} fill="none" markerEnd={`url(#arrow-${index})`} />
                  {label && (
                    <text x={mid[0]} y={mid[1]} textAnchor={anchor} className="pd-diagram__edge-label">
                      {label}
                    </text>
                  )}
                </g>
              );
            })}
          </g>

          <g className="pd-diagram__nodes">
            {[...positions.values()].map((node) => (
              <g key={node.id} className={`pd-diagram__node pd-diagram__node--${node.kind ?? "default"}`}>
                <rect x={node.x} y={node.y} width={NODE_W} height={NODE_H} rx="7" />
                {/* Long labels step down a size so they stay inside the box. */}
                <text
                  x={node.x + NODE_W / 2}
                  y={node.y + (node.sub ? 32 : 46)}
                  textAnchor="middle"
                  className="pd-diagram__label"
                  style={node.label.length > 15 ? { fontSize: node.label.length > 19 ? 16 : 18 } : undefined}
                >
                  {node.label}
                </text>
                {node.sub && (
                  <text
                    x={node.x + NODE_W / 2}
                    y={node.y + 57}
                    textAnchor="middle"
                    className="pd-diagram__sub"
                    style={node.sub.length > 24 ? { fontSize: 13 } : undefined}
                  >
                    {node.sub}
                  </text>
                )}
              </g>
            ))}
          </g>
        </svg>
      </div>
      <figcaption className="pd-figure__caption">
        <span className="pd-figure__label">FIG. {String(index).padStart(2, "0")}</span> {spec.caption ?? spec.title}
      </figcaption>
    </figure>
  );
}
