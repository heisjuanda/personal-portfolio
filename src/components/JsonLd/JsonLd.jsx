import { useEffect } from "react";

const SELECTOR = 'script[type="application/ld+json"]';

export default function JsonLd({ data }) {
  useEffect(() => {
    let script = document.head.querySelector(SELECTOR);

    if (!data) {
      script?.remove();
      return;
    }

    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data).replaceAll("<", "\\u003c");
  }, [data]);

  return null;
}
