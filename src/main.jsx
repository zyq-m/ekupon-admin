import React from "react";
import ReactDOM from "react-dom/client";
import * as Page from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page.Dashboard />,
  },
  {
    path: "/register/cafe",
    element: <Page.CafeRegister />,
  },
  {
    path: "/register/student",
    element: <Page.StudentRegister />,
  },
  {
    path: "/data/cafe",
    element: <Page.CafeData />,
  },
  {
    path: "/data/student",
    element: <Page.StudentData />,
  },
  {
    path: "/top-up-wallet",
    element: <Page.TopUpWallet />,
  },
  {
    path: "/transaction/cafe/all",
    element: <Page.TransactionAllCafe />,
  },
  {
    path: "/spend-limit",
    element: <Page.SpendLimit />,
  },
  {
    path: "/login",
    element: <Page.Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
