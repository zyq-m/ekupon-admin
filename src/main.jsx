import React from "react";
import ReactDOM from "react-dom/client";
import * as Page from "./pages";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page.Dashboard />,
    loader: protectedLoader,
  },
  {
    path: "/register/cafe",
    element: <Page.CafeRegister />,
    loader: protectedLoader,
  },
  {
    path: "/register/student",
    element: <Page.StudentRegister />,
    loader: protectedLoader,
  },
  {
    path: "/data/cafe",
    element: <Page.CafeData />,
    loader: protectedLoader,
  },
  {
    path: "/data/cafe/transaction/:id",
    element: <Page.CafeTransaction />,
    loader: protectedLoader,
  },
  {
    path: "/data/student",
    element: <Page.StudentData />,
    loader: protectedLoader,
  },
  {
    path: "/data/student/transaction/:id",
    element: <Page.StudentTransaction />,
    loader: protectedLoader,
  },
  {
    path: "/top-up-wallet",
    element: <Page.TopUpWallet />,
    loader: protectedLoader,
  },
  {
    path: "/transaction/cafe/all",
    element: <Page.TransactionAllCafe />,
    loader: protectedLoader,
  },
  {
    path: "/spend-limit",
    element: <Page.SpendLimit />,
    loader: protectedLoader,
  },
  {
    path: "/login",
    element: <Page.Login />,
  },
]);

function protectedLoader({ request }) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  const token = localStorage.getItem("access-token");
  if (!token) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
