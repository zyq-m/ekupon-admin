import { useState, useEffect } from "react";
import { Layout } from "../components";

import { socket } from "../services/io";
import { formatedNum } from "../utils/helper";
import PersonIcon from "@mui/icons-material/Person";
import StorefrontIcon from "@mui/icons-material/Storefront";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function Dashboard() {
	const [summary, setSummary] = useState({
		student: 7641,
		cafe: 35,
		coupon: 165799,
	});

	useEffect(() => {
		socket.emit("admin:get-overall");
		socket.on("admin:get-overall", (data) => {
			console.log(data);
			setSummary(data);
		});
	}, []);

	return (
		<Layout title="Dashboard">
			<div
				className="flex gap-4 flex-nowrap overflow-x-auto"
				style={{ whiteSpace: "nowrap" }}
			>
				{/* Card 1 */}
				<div
					className="flex items-center gap-4 bg-white shadow-md rounded-lg p-4 w-80"
					style={{ backgroundColor: "#f2f2f2" }}
				>
					<div className="flex items-center justify-center w-16 h-16 bg-orange-500 rounded-lg">
						<PersonIcon style={{ color: "white", fontSize: "30px" }} />
					</div>

					<div className="flex flex-col flex-grow">
						<div className="flex justify-between">
							<h3 className="font-bold text-lg text-black">Total Students</h3>
						</div>
						<p className="text-2xl font-semibold text-black">
							{formatedNum(summary.student)}
						</p>
						<div className="flex items-center gap-1 text-sm text-orange-600">
							{/* <span>+55% last month</span> */}
						</div>
					</div>
				</div>

				{/* Card 2 */}
				<div
					className="flex items-center gap-4 bg-white shadow-md rounded-lg p-4 w-80"
					style={{ backgroundColor: "#f2f2f2" }}
				>
					<div className="flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-lg">
						<StorefrontIcon style={{ color: "white", fontSize: "30px" }} />
					</div>

					<div className="flex flex-col flex-grow">
						<div className="flex justify-between">
							<h3 className="font-bold text-lg text-black">Total Cafes</h3>
						</div>
						<p className="text-2xl font-semibold text-black">
							{formatedNum(summary.cafe)}
						</p>
						<div className="flex items-center gap-1 text-sm text-orange-600">
							{/* <span>+12% last month</span> */}
						</div>
					</div>
				</div>

				{/* Card 3 */}
				<div
					className="flex items-center gap-4 bg-white shadow-md rounded-lg p-4 w-80"
					style={{ backgroundColor: "#f2f2f2" }}
				>
					<div className="flex items-center justify-center w-16 h-16 bg-red-500 rounded-lg">
						<QrCodeScannerIcon style={{ color: "white", fontSize: "30px" }} />
					</div>

					<div className="flex flex-col flex-grow">
						<div className="flex justify-between">
							<h3 className="font-bold text-lg text-black">
								Total Transaction
							</h3>
						</div>
						<p className="text-2xl font-semibold text-black">
							{formatedNum(summary.coupon)}
						</p>
						<div className="flex items-center gap-1 text-sm text-orange-600">
							{/* <span>+20% last month</span> */}
						</div>
					</div>
				</div>
			</div>
			<br />
			<div role="alert" className="alert">
				<span>Active Coupon</span>
			</div>
			<br />
			<div className="flex flex-wrap gap-4">
				<div className="flex items-center gap-4 bg-white shadow-md rounded-lg w-80">
					<div className="card-body">
						<h2 className="card-title">MAIDAM FASA 2</h2>
						<div className="divider"></div>
						<div className="card-actions justify-between">
							<div className="flex items-start">
								<AccessTimeIcon style={{ color: "grey", fontSize: "15px" }} />
								&nbsp;
								<div className="flex flex-col ml-2">
									<p style={{ fontSize: "14px", margin: 0 }}>Exp Date</p>
									<i style={{ fontSize: "12px", color: "grey" }}>27/02/2025</i>
								</div>
							</div>
							<div className="flex items-start">
								<AttachMoneyIcon style={{ color: "grey", fontSize: "15px" }} />
								&nbsp;
								<div className="flex flex-col ml-2">
									<p style={{ fontSize: "14px", margin: 0 }}>Amount</p>
									<i style={{ fontSize: "12px", color: "grey" }}>RM600.00</i>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="flex items-center gap-4 bg-white shadow-md rounded-lg w-80">
					<div className="card-body">
						<h2 className="card-title">PAYNET-PAKAT 1</h2>
						<div className="divider"></div>
						<div className="card-actions justify-between">
							<div className="flex items-start">
								<AccessTimeIcon style={{ color: "grey", fontSize: "15px" }} />
								&nbsp;
								<div className="flex flex-col ml-2">
									<p style={{ fontSize: "14px", margin: 0 }}>Exp Date</p>
									<i style={{ fontSize: "12px", color: "grey" }}>30/12/2024</i>
								</div>
							</div>
							<div className="flex items-start">
								<AttachMoneyIcon style={{ color: "grey", fontSize: "15px" }} />
								&nbsp;
								<div className="flex flex-col ml-2">
									<p style={{ fontSize: "14px", margin: 0 }}>Amount</p>
									<i style={{ fontSize: "12px", color: "grey" }}>RM100.00</i>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="flex items-center gap-4 bg-white shadow-md rounded-lg w-80">
					<div className="card-body">
						<h2 className="card-title">PAYNET-PAKAT 2</h2>
						<div className="divider"></div>
						<div className="card-actions justify-between">
							<div className="flex items-start">
								<AccessTimeIcon style={{ color: "grey", fontSize: "15px" }} />
								&nbsp;
								<div className="flex flex-col ml-2">
									<p style={{ fontSize: "14px", margin: 0 }}>Exp Date</p>
									<i style={{ fontSize: "12px", color: "grey" }}>30/12/2024</i>
								</div>
							</div>
							<div className="flex items-start">
								<AttachMoneyIcon style={{ color: "grey", fontSize: "15px" }} />
								&nbsp;
								<div className="flex flex-col ml-2">
									<p style={{ fontSize: "14px", margin: 0 }}>Amount</p>
									<i style={{ fontSize: "12px", color: "grey" }}>RM200.00</i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<br />
			<div role="alert" className="alert">
				<span>Inactive Coupon</span>
			</div>
			<br />
			<div className="flex flex-wrap gap-4">
				<div className="flex items-center gap-4 bg-white shadow-md rounded-lg w-80">
					<div className="card-body">
						<h2 className="card-title">MAIDAM FASA 2</h2>
						<div className="divider"></div>
						<div className="card-actions justify-between">
							<div className="flex items-start">
								<AccessTimeIcon style={{ color: "grey", fontSize: "15px" }} />
								&nbsp;
								<div className="flex flex-col ml-2">
									<p style={{ fontSize: "14px", margin: 0 }}>Exp Date</p>
									<div className="badge badge-ghost">Expired</div>
								</div>
							</div>
							<div className="flex items-start">
								<AttachMoneyIcon style={{ color: "grey", fontSize: "15px" }} />
								&nbsp;
								<div className="flex flex-col ml-2">
									<p style={{ fontSize: "14px", margin: 0 }}>Amount</p>
									<i style={{ fontSize: "12px", color: "grey" }}>RM10.00</i>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="flex items-center gap-4 bg-white shadow-md rounded-lg w-80">
					<div className="card-body">
						<h2 className="card-title">PAYNET-PAKAT 1</h2>
						<div className="divider"></div>
						<div className="card-actions justify-between">
							<div className="flex items-start">
								<AccessTimeIcon style={{ color: "grey", fontSize: "15px" }} />
								&nbsp;
								<div className="flex flex-col ml-2">
									<p style={{ fontSize: "14px", margin: 0 }}>Exp Date</p>
									<div className="badge badge-ghost">Expired</div>
								</div>
							</div>
							<div className="flex items-start">
								<AttachMoneyIcon style={{ color: "grey", fontSize: "15px" }} />
								&nbsp;
								<div className="flex flex-col ml-2">
									<p style={{ fontSize: "14px", margin: 0 }}>Amount</p>
									<i style={{ fontSize: "12px", color: "grey" }}>RM10.00</i>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="flex items-center gap-4 bg-white shadow-md rounded-lg w-80">
					<div className="card-body">
						<h2 className="card-title">PAYNET-PAKAT 2</h2>
						<div className="divider"></div>
						<div className="card-actions justify-between">
							<div className="flex items-start">
								<AccessTimeIcon style={{ color: "grey", fontSize: "15px" }} />
								&nbsp;
								<div className="flex flex-col ml-2">
									<p style={{ fontSize: "14px", margin: 0 }}>Exp Date</p>
									<div className="badge badge-ghost">Expired</div>
								</div>
							</div>
							<div className="flex items-start">
								<AttachMoneyIcon style={{ color: "grey", fontSize: "15px" }} />
								&nbsp;
								<div className="flex flex-col ml-2">
									<p style={{ fontSize: "14px", margin: 0 }}>Amount</p>
									<i style={{ fontSize: "12px", color: "grey" }}>RM10.00</i>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
