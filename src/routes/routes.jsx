import React, { startTransition, Suspense } from "react";
import { Layout } from "components";
import { Route, Routes } from "react-router-dom";
import { authRoutes, pages } from "./index";
import { useSelector } from "react-redux";
import { get } from "lodash";
import NotFound from 'pages/not-found'
import Loading from 'pages/loading'

const appRoutes = (routes) => {
  return routes.map((route, key) => (
    <React.Fragment key={key}>
      <Route
        path={route.path}
        element={<Suspense fallback={<Loading />}>{route.element}</Suspense>}
      />
      {route.children && appRoutes(route.children)}
    </React.Fragment>
  ));
};

const routesWrapper = () => {
  const { isAuthenticated } = useSelector((state) => get(state, "auth"));
  // const isAuthenticated = true;
  const { myUser } = useSelector((state) => state.myUser)

  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      {isAuthenticated ? (
        <Route path="/" element={<Layout />}>
          {/* {appRoutes(privateRoutes)} */}
          {/* {appRoutes(pages[myUser?.status])} */}
          {appRoutes(pages["Direktor"])}
          {/* {appRoutes(pages)} */}
        </Route>
      ) : (
        appRoutes(authRoutes)
      )}
    </Routes>
  );
  // return <Routes>{appRoutes(privateRoutes)}</Routes>;
};

export default routesWrapper;