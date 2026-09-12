import { lazy, Suspense } from "react";
import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";

import SkipNav from "./components/SkipNav/SkipNav.jsx";
import SoundToggle from "./components/SoundToggle/SoundToggle.jsx";
import ConsentNotice from "./components/ConsentNotice/ConsentNotice.jsx";

import Home from "./views/Home/Home";
import ProjectDetails from "./views/ProjectDetails/ProjectDetails";

const NotFound = lazy(() => import("./views/NotFound/NotFound"));

const notFoundElement = (
  <Suspense fallback={<div className="blueprint-bg" />}>
    <NotFound />
  </Suspense>
);

function RootLayout() {
  return (
    <>
      <SkipNav />
      <ConsentNotice />
      <Outlet />
      <SoundToggle />
      <ScrollRestoration
        getKey={(location) =>
          location.pathname === "/" ? location.pathname : location.key
        }
      />
    </>
  );
}

/**
 * Single route table shared by the browser router (main.jsx) and the static
 * router used to pre-render every page at build time (entry-server.jsx).
 * Keeping one source guarantees the server markup and the client tree match,
 * which is what makes hydration possible.
 */
export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: notFoundElement,
    children: [
      { path: "", element: <Home /> },
      { path: "projects", element: <Navigate to="/" replace /> },
      { path: "projects/:id", element: <ProjectDetails /> },
    ],
  },
  {
    path: "*",
    element: notFoundElement,
    errorElement: notFoundElement,
  },
];
