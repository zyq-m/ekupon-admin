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
		path: "/ekupon-admin",
		element: <Page.Dashboard />,
		loader: protectedLoader,
	},
	{
		path: "/ekupon-admin/dashboard",
		element: <Page.Dashboard />,
		loader: protectedLoader,
	},
	{
		path: "/ekupon-admin/register/cafe",
		element: <Page.CafeRegister />,
		loader: protectedLoader,
	},
	{
		path: "/ekupon-admin/register/student",
		element: <Page.StudentRegister />,
		loader: protectedLoader,
	},
	{
		path: "/ekupon-admin/data/cafe",
		element: <Page.CafeData />,
		loader: protectedLoader,
	},
	{
		path: "/ekupon-admin/data/cafe/transaction/:id",
		element: <Page.CafeTransaction />,
		loader: protectedLoader,
	},
	{
		path: "/ekupon-admin/data/student",
		element: <Page.StudentData />,
		loader: protectedLoader,
	},
	{
		path: "/ekupon-admin/data/student/transaction/:id/:fundId",
		element: <Page.StudentTransaction />,
		loader: protectedLoader,
	},
	{
		path: "/ekupon-admin/top-up-wallet",
		element: <Page.TopUpWallet />,
		loader: protectedLoader,
	},
	{
		path: "/ekupon-admin/transaction/cafe/all",
		element: <Page.TransactionAllCafe />,
		loader: protectedLoader,
	},
	{
		path: "/ekupon-admin/coupon/list",
		element: <Page.Coupon />,
		loader: protectedLoader,
	},
	{
		path: "/ekupon-admin/coupon/setup",
		element: <Page.SetupCoupon />,
		loader: protectedLoader,
	},
	{
		path: "/ekupon-admin/login",
		element: <Page.Login />,
	},
]);

function protectedLoader({ request }) {
	// If the user is not logged in and tries to access `/protected`, we redirect
	// them to `/login` with a `from` parameter that allows login to redirect back
	// to this page upon successful authentication
	const token = sessionStorage.getItem("access-token");
	if (!token) {
		let params = new URLSearchParams();
		params.set("from", new URL(request.url).pathname);
		return redirect("/ekupon-admin/login?" + params.toString());
	}
	return null;
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
