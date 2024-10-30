import { lazy } from "react";

const SignIn = lazy(() => import("pages/auth/signIn"))
const SignUp = lazy(() => import("pages/auth/signIn/register"))
const Home = lazy(() => import("pages/home"));

const authRoutes = [
  {
    path: "/auth/sign-in",
    element: <SignIn />,
  },
  {
    path: "/auth/sign-up",
    element: <SignUp />,
  }
];

const pages = {

  // ADMIN
  Direktor: [
    {
      path: "/",
      element: <Home />,
      children: [{}]
    },
  ],

  //  ASSIST
  Admin: [
    {
      path: "/",
      element: <Home />,
      children: [{}]
    }
  ]
}

export { authRoutes, pages };