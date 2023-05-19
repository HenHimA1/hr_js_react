import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";

const Login = lazy(() => import("./login"));
const Attendance = lazy(() => import("./attendance"));
const Logout = lazy(() => import("./logout"));

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <Suspense fallback={<Loading />}>
        <Attendance />
      </Suspense>,
  },
  {
    path: "/login",
    element:
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ,
  },
  {
    path: "/logout",
    element:
      <Suspense fallback={<Loading />}>
        <Logout />
      </Suspense>
    ,
  },
]);

function Pages() {
  return <RouterProvider router={router} />;
}

export default Pages;
