import { useEffect } from "react";
import { RouterProvider, StaticRouterProvider } from "react-router-dom";

export default function App({ router, staticContext }) {
  useEffect(() => {
    const calculateVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    calculateVh();

    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        calculateVh();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", calculateVh);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", calculateVh);
    };
  }, []);

  if (staticContext) {
    return (
      <StaticRouterProvider
        router={router}
        context={staticContext}
        hydrate={false}
      />
    );
  }

  return <RouterProvider router={router} />;
}
