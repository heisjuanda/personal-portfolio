import { Link } from "react-router-dom";

import "./PaperContent.css";

const TOKEN = /\{(\w+)\}/g;
const EXTERNAL_ARROW = "\u2197\uFE0E";

function resolvePlain(text, links) {
  if (!links) return text;
  return text.replace(TOKEN, (_, key) => links[key]?.label ?? "");
}

function PaperLink({ label, to, href }) {
  if (to) {
    return (
      <Link to={to} className="paper-link">
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
    >
      {label}
      <span className="paper-link__arrow" aria-hidden="true">
        {EXTERNAL_ARROW}
      </span>
    </a>
  );
}

function RichText({ text, links }) {
  if (!links) return text;

  const parts = [];
  let cursor = 0;

  for (const match of text.matchAll(TOKEN)) {
    const link = links[match[1]];
    if (!link) continue;

    if (match.index > cursor) parts.push(text.slice(cursor, match.index));
    parts.push(<PaperLink key={match.index} {...link} />);
    cursor = match.index + match[0].length;
  }

  if (cursor === 0) return text;
  if (cursor < text.length) parts.push(text.slice(cursor));

  return parts;
}

export default function PaperContent({ entry, variant = "modal" }) {
  const { title, titleHref, content, links, experience } = entry;

  if (variant === "outline") {
    return (
      <>
        <h3>{title}</h3>
        <p>{resolvePlain(content, links)}</p>
        {experience && (
          <>
            <p>{experience.role}</p>
            <h4>Achievements:</h4>
            <ul>
              {experience.achievement.map((achievement) => (
                <li key={achievement}>{resolvePlain(achievement, links)}</li>
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
