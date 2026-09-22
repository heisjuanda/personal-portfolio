import PaperContainer from "../PaperContainer/PaperContainer";

import { CAREER_START_YEAR } from "../../constants/constants";

import "./Title.css";

export default function Title() {
  const experienceYears = new Date().getFullYear() - CAREER_START_YEAR;

  return (
    <section className="title">
      <div className="title__scraps" aria-hidden="true">
        <span className="title__scrap title__scrap--tape-l" />
        <span className="title__scrap title__scrap--paper-l" />
        <span className="title__scrap title__scrap--map-r" />
        <span className="title__scrap title__scrap--tape-r" />
        <span className="title__scrap title__scrap--stamp" />
      </div>
      <h1 className="title__text sr-only">
        Juan David Moreno | Software Engineer &amp; Creative Developer
      </h1>
      <div className="subtitle__text-wrapper">
        <a
          href="https://github.com/heisjuanda"
          target="_blank"
          rel="noopener noreferrer"
          className="subtitle__handle tape-button"
          aria-label="Juan David Moreno on GitHub (opens in new tab)"
        >
          @heisjuanda
        </a>
        <PaperContainer className="subtitle__year">
          <p>
            @{new Date().getFullYear()}
          </p>
        </PaperContainer>
      </div>
      <div className="title__img-wrapper">
        <picture>
          <source
            media="(max-width: 550px)"
            srcSet="/images/title/juanda's--mobile.avif"
            width="400"
            height="102"
          />
          <img
            className="title__img title__img--juanda"
            src="/images/title/juanda's.avif"
            alt="Juanda's paper collage style title"
            aria-label="Juanda's"
            width="1000"
            height="256"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        <picture>
          <source
            media="(max-width: 550px)"
            srcSet="/images/title/adventure--mobile.avif"
            width="500"
            height="111"
          />
          <img
            className="title__img title__img--adventure"
            src="/images/title/adventure.avif"
            alt="Adventure paper collage style title"
            aria-label="Adventure"
            width="1000"
            height="221"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
      </div>
      <p className="title__intro">
        <span className="title__intro-line title__intro-line--lead">
          <span className="title__intro-chunk">
            Software Engineer at{" "}
            <a
              className="title__intro-link"
              href="https://www.truora.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Truora (opens in new tab)"
            >
              Truora
            </a>
          </span>
          <span className="title__intro-sep" aria-hidden="true">
            —
          </span>
          <span className="title__intro-chunk">Cali, Colombia</span>
        </span>
        <span className="title__intro-line">
          <span className="title__intro-chunk">
            +{experienceYears} years building web products,
          </span>{" "}
          <span className="title__intro-chunk">
            APIs and cloud infrastructure
          </span>
        </span>
      </p>
    </section>
  );
}
