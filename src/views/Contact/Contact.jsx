import "./Contact.css";

export default function Contact() {
  const handleDownloadCV = () => {
    window.open("/cv/cv.pdf", "_blank");
  };

  return (
    <section className="contact">
      <div className="contact__container">
        <div className="contact__title-wrapper">
          <h2 className="contact__title">Contact Me</h2>
        </div>

        <div className="contact__notes-grid">
          <a
            href="mailto:heisjuanda@gmail.com"
            className="contact__note contact__note--yellow"
          >
            <div className="contact__note-glue"></div>
            <div className="contact__note-content">
              <span className="contact__note-tag">[ EMAIL ]</span>
              <p className="contact__note-text">heisjuanda@gmail.com</p>
              <span className="contact__note-action">{"\u2794\uFE0E"} Write me</span>
            </div>
          </a>

          <div className="contact__note contact__note--cyan">
            <div className="contact__note-glue"></div>
            <div className="contact__note-content">
              <span className="contact__note-tag">[ NETWORKS ]</span>
              <div className="contact__note-socials">
                <a
                  href="https://www.linkedin.com/in/juan-david-moreno-883a46233/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Juan David Moreno on LinkedIn (opens in new tab)"
                >
                  LinkedIn{"\u2197\uFE0E"}
                </a>
                <a
                  href="https://github.com/heisjuanda"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Juan David Moreno on GitHub (opens in new tab)"
                >
                  GitHub{"\u2197\uFE0E"}
                </a>
                <a
                  href="https://www.instagram.com/soyjuandamoreno/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Juan David Moreno on Instagram (opens in new tab)"
                >
                  Instagram{"\u2197\uFE0E"}
                </a>
              </div>
            </div>
          </div>

          <button
            onClick={handleDownloadCV}
            className="contact__note contact__note--pink"
            aria-label="Download my CV as PDF"
            type="button"
          >
            <div className="contact__note-glue"></div>
            <div className="contact__note-content">
              <span className="contact__note-tag">[ CURRICULUM ]</span>
              <p className="contact__note-text">cv.pdf</p>
              <span className="contact__note-stamp">DOWNLOAD</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
