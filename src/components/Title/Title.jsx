import "./Title.css";

export default function Title() {
  return (
    <section className="title">
      <h1 className="title__text">
        <span>Juanda's</span>
        <span>Adventure</span>
      </h1>
      <div className="subtitle__text-wrapper">
        <h2>
            <a href="https://github.com/heisjuanda" target="_blank" rel="noopener noreferrer">
                <p>@heisjuanda</p>
            </a>
        </h2>
        <h3>
            <p>
                @{new Date().getFullYear()}
            </p>
        </h3>
      </div>
      <div className="title__img-wrapper">
        <img
          className="title__img title__img--juanda"
          src="images/title/juanda's.webp"
          alt="Juanda's paper collage style title"
          aria-label="Juanda's"
          loading="eager"
        />
        <img
          className="title__img title__img--adventure"
          src="images/title/adventure.webp"
          alt="Adventure paper collage style title"
          aria-label="Adventure"
          loading="eager"
        />
      </div>
    </section>
  );
}
