import { Link } from "react-router-dom";

import SEOHead from "../../components/SEOHead/SEOHead.jsx";
import PaperContainer from "../../components/PaperContainer/PaperContainer.jsx";
import { CHARACTER_IMAGES } from "../../constants/constants.js";


import './NotFound.css'

export default function NotFound({ isProjectView }) {
  return (
    <>
      <SEOHead
        title="404 — Page Not Found"
        description="The page you are looking for does not exist."
        noIndex={true}
      />
      <main className="not-found" aria-labelledby="not-found-heading">
        <h1 id="not-found-heading" className="not-found__title">404</h1>

        <img
          className="not-found--404_img"
          src="/images/notFound/404.webp"
          alt="404 — Page not found"
          loading="eager"
          width={300}
        />

        <PaperContainer className="container--not-found">
          <h3>
            The {isProjectView ? "project" : "page"} you are looking for does not exist.
          </h3>
        </PaperContainer>

        <div className="not-found__back--container">
          <img
            className="not-found--character_img"
            src={CHARACTER_IMAGES.THINKING_FRONT}
            alt="Juanda scratching his head, looking confused"
            loading="eager"
            height={400}
          />

          <Link to="/" className="not-found__paper-btn">
            <span className="not-found__btn-text">
              &lt;&lt; Back to Home
            </span>
          </Link>
        </div>
      </main>
    </>
  );
}