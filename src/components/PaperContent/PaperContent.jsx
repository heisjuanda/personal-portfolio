import { Link } from "react-router-dom";

import "./PaperContent.css";

const TOKEN = /\{(\w+)\}/g;
const EXTERNAL_ARROW = "\u2197\uFE0E";

function PaperLink({ label, to, href, tabIndex }) {
  if (to) {
    return (
      <Link to={to} className="paper-link" tabIndex={tabIndex}>
        {label}
      </Link>
    );
  }

  return (
    <a
      className="paper-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in new tab)`}
      tabIndex={tabIndex}
    >
      {label}
      <span className="paper-link__arrow" aria-hidden="true">
        {EXTERNAL_ARROW}
      </span>
    </a>
  );
}

function RichText({ text, links, tabIndex }) {
  if (!links) return text;

  const parts = [];
  let cursor = 0;

  for (const match of text.matchAll(TOKEN)) {
    const link = links[match[1]];
    if (!link) continue;

    if (match.index > cursor) parts.push(text.slice(cursor, match.index));
    parts.push(<PaperLink key={match.index} {...link} tabIndex={tabIndex} />);
    cursor = match.index + match[0].length;
  }

  if (cursor === 0) return text;
  if (cursor < text.length) parts.push(text.slice(cursor));

  return parts;
}

export default function PaperContent({ entry, variant = "modal" }) {
  const { title, titleHref, content, links, experience } = entry;

  // The outline is the copy that lives in the always-rendered sr-only block in
  // About, so it is what crawlers actually read — it used to flatten every link
  // to plain text, which cost the outbound links to Truora and Cressco and the
  // internal one to the Josh Wood case study. It renders them for real now.
  //
  // tabIndex -1 throughout: the block is visually hidden, so a sighted keyboard
  // user tabbing through the page would otherwise land on invisible links.
  // Crawlers still follow the href and screen readers still reach them in
  // browse mode; only the Tab order skips them.
  if (variant === "outline") {
    return (
      <>
        <h3>
          {titleHref ? (
            <a
              href={titleHref}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        <p>
          <RichText text={content} links={links} tabIndex={-1} />
        </p>
        {experience && (
          <>
            <p>{experience.role}</p>
            <h4>Achievements:</h4>
            <ul>
              {experience.achievement.map((achievement) => (
                <li key={achievement}>
                  <RichText text={achievement} links={links} tabIndex={-1} />
                </li>
              ))}
            </ul>
          </>
        )}
      </>
    );
  }

  return (
    <div className="about__paper-content">
      <h3 className="about__paper-title">
        {titleHref ? (
          <a
            className="paper-link paper-link--title"
            href={titleHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} website (opens in new tab)`}
          >
            {title}
            <span className="paper-link__arrow" aria-hidden="true">
              {EXTERNAL_ARROW}
            </span>
          </a>
        ) : (
          title
        )}
      </h3>

      <p className="about__paper-text">
        <RichText text={content} links={links} />
      </p>

      {experience && (
        <div className="paper-modal__experience-section">
          <h4 className="paper-modal__experience-title">Achievements:</h4>

          <div className="paper-modal__work-item">
            <span className="paper-modal__role-name">{experience.role}</span>
            {experience.achievement.map((achievement) => (
              <p key={achievement} className="paper-modal__achievement-text">
                <span>&bull;</span>{" "}
                <RichText text={achievement} links={links} />
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
