import Home from "./Pages/Home/Home";
import React from "react";
import Auth from "./Pages/Auth";
const routes = [
  {
    name: "Home",
    path: "/",
    component: <Home/>
  },
  {
    name: "Auth",
    path: "/auth",
    component: <Auth/>
  }
];

export default routes;
