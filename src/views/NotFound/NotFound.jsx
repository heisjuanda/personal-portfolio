import { Link } from "react-router-dom";
import SEOHead from "../../components/SEOHead/SEOHead.jsx";
import './NotFound.css'

export default function NotFound() {
  return (
    <>
      <SEOHead
        title="404 — Page Not Found"
        description="The page you are looking for does not exist."
        noIndex={true}
      />
      <main className="not-found blueprint-bg" aria-labelledby="not-found-heading">
        <h1 id="not-found-heading" className="not-found__title">404</h1>
        <img
          className="not-found--404_img"
          src="/images/notFound/404.webp"
          alt="404 — Page not found"
          loading="eager"
          width={300}
        />
        <img
          className="not-found--character_img"
          src="/images/character/character_thinking.webp"
          alt="Juanda scratching his head, looking confused"
          loading="eager"
          height={400}
        />
        <Link to="/" className="not-found__home-link">
          ← Back to Home
        </Link>
      </main>
    </>
  );
}