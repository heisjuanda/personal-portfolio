import { useEffect, lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration } from "react-router-dom";
import SkipNav from "./components/SkipNav/SkipNav.jsx";

import Home from "./views/Home/Home";
import ProjectDetails from "./views/ProjectDetails/ProjectDetails";

const NotFound = lazy(() => import("./views/NotFound/NotFound"));

function RootLayout() {
  return (
    <>
      <SkipNav />
      <Outlet />
      <ScrollRestoration />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetails />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div className="blueprint-bg" />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default function App() {
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

  return <RouterProvider router={router} />;
}

