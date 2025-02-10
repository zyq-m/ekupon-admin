import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import AddCardRoundedIcon from "@mui/icons-material/AddCardRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";

const nav = [
	{
		id: 1,
		name: "Dashboard",
		link: "/ekupon-admin/dashboard",
		icon: () => <HomeRoundedIcon fontSize="small" />,
	},
	{
		id: 2,
		name: "Registration",
		icon: () => <PersonAddAltRoundedIcon fontSize="small" />,
		child: [
			{
				id: 1.2,
				name: "Cafe",
				link: "/ekupon-admin/register/cafe",
			},
			{
				id: 1.3,
				name: "Student",
				link: "/ekupon-admin/register/student",
			},
		],
	},
	{
		id: 3,
		name: "User Data",
		icon: () => <PeopleAltRoundedIcon fontSize="small" />,
		child: [
			{
				id: 3.1,
				name: "Cafe",
				link: "/ekupon-admin/data/cafe",
			},
			{
				id: 3.2,
				name: "Student",
				link: "/ekupon-admin/data/student",
			},
		],
	},
	{
		id: 4,
		name: "Top Up",
		link: "/ekupon-admin/top-up-wallet",
		icon: () => <AddCardRoundedIcon fontSize="small" />,
	},
	{
		id: 5,
		name: "Transaction",
		link: "/ekupon-admin/transaction/cafe/all",
		icon: () => <ChecklistRoundedIcon fontSize="small" />,
	},
	{
		id: 6,
		name: "Coupon",
		icon: () => <PaidRoundedIcon fontSize="small" />,
		child: [
			{
				id: 6.1,
				name: "List",
				link: "/ekupon-admin/coupon/list",
			},
			{
				id: 6.2,
				name: "Setup Coupon",
				link: "/ekupon-admin/coupon/setup",
			},
		],
	},
];

export default function Sidebar() {
	const [expanded, setExpanded] = useState({});

	const toggleExpansion = (id) => {
		setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	const activeLink = "flex gap-2 items-center px-3 py-2 rounded-lg capitalize";

	return (
		<nav
			className="flex flex-col justify-between w-[169px]"
			style={{ minHeight: "calc(100vh - 4rem)" }}
		>
			<ul>
				{nav.map((d) => (
					<li key={d.id}>
						<div
							className={`${activeLink} ${
								d.link ? "" : "cursor-pointer"
							}`}
							onClick={() => d.child && toggleExpansion(d.id)}
						>
							{d.icon()}
							{d.link ? (
								<NavLink
									to={d.link}
									className={({ isActive }) =>
										isActive
											? `${activeLink} bg-stone-700 text-white`
											: `${activeLink} hover:bg-gray-100`
									}
								>
									{d.name}
								</NavLink>
							) : (
								d.name
							)}
						</div>
						{/* Child Menu */}
						{d.child && expanded[d.id] && (
							<ul className="ml-5">
								{d.child.map((e) => (
									<li key={e.id} className="ml-3">
										<NavLink
											to={e.link}
											className={({ isActive }) =>
												isActive
													? `${activeLink} bg-stone-700 text-white`
													: `${activeLink} hover:bg-gray-100`
											}
										>
											{e.name}
										</NavLink>
									</li>
								))}
							</ul>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
}
