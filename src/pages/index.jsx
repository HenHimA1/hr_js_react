import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";

const Login = lazy(() => import("./login"));
const Attendance = lazy(() => import("./attendance"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Attendance />,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ),
  },
]);

function Pages() {
  return <RouterProvider router={router} />;
}

export default Pages;
