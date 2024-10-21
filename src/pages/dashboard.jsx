import { useState, useEffect } from "react";
import { Layout } from "../components";

import { socket } from "../services/io";
import { formatedNum } from "../utils/helper";

export default function Dashboard() {
	const [summary, setSummary] = useState({
		student: 0,
		cafe: 0,
		coupon: 0,
	});

	useEffect(() => {
		socket.emit("admin:get-overall");
		socket.on("admin:get-overall", (data) => {
			setSummary(data);
		});
	}, []);

	return (
		<Layout title="Dashboard">
			<div className="stats shadow">
				<div className="stat">
					<div className="stat-title capitalize">Total student</div>
					<div className="stat-value">
						{formatedNum(summary.student)}
					</div>
					<div className="stat-desc">Students</div>
				</div>
				<div className="stat">
					<div className="stat-title capitalize">Total cafe</div>
					<div className="stat-value">
						{formatedNum(summary.cafe)}
					</div>
					<div className="stat-desc">Cafes</div>
				</div>
				<div className="stat">
					<div className="stat-title capitalize">
						Total transaction
					</div>
					<div className="stat-value">
						{formatedNum(summary.coupon)}
					</div>
					<div className="stat-desc">Transactions</div>
				</div>
			</div>

			<div className="flex flex-wrap gap-4 mt-8">
				{summary?.fund?.map((data) => (
					<div className="stat w-44" key={data.fund}>
						<div className="stat-title capitalize">{data.fund}</div>
						<div className="stat-value">
							{formatedNum(data.count)}
						</div>
						<div className="stat-desc">Students</div>
					</div>
				))}
			</div>
		</Layout>
	);
}
