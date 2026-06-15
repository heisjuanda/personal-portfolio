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
              <span className="contact__note-action">➔ Write me</span>
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
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </a>
                <a
                  href="https://github.com/heisjuanda"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://www.instagram.com/soyjuandamoreno/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram ↗
                </a>
              </div>
            </div>
          </div>

          <button
            onClick={handleDownloadCV}
            className="contact__note contact__note--pink"
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
