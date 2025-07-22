import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, BtnSuspend, Loading } from "../../components";

import { api } from "../../services/axios";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { suspend } from "../../api/user";

export default function CafeData() {
	const [cafe, setCafe] = useState([]);

	const downloadQR = async () => {
		try {
			const res = await api.get("/admin/qr", { responseType: "blob" });

			const url = window.URL.createObjectURL(new Blob([res.data]));
			const link = document.createElement("a");

			link.href = url;
			link.setAttribute("download", "Cafe_QR_Code.zip");
			document.body.appendChild(link);
			link.click();
		} catch (error) {
			console.log(error);
		}
	};

	const onSuspend = async (id, active) => {
		try {
			await suspend(id, active);
			fetchCafes();
		} catch (error) {
			console.log(error);
		}
	};

	const fetchCafes = () => {
		api
			.get("/cafe")
			.then((res) => {
				setCafe(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		fetchCafes();
	}, []);

	if (!cafe.length) {
		return (
			<Layout title="Cafe data">
				<Loading />
			</Layout>
		);
	}

	return (
		<Layout title="Cafe data">
			<div
				className="flex gap-4 flex-nowrap overflow-x-auto"
				style={{ whiteSpace: "nowrap" }}
			>
				<div
					className="flex items-center gap-4 bg-white shadow-md rounded-lg p-4 w-80"
					style={{ backgroundColor: "#f2f2f2" }}
				>
					<div
						className="flex items-center justify-center w-16 h-16 rounded-lg"
						style={{ backgroundColor: "#ffbe00" }}
					>
						<StorefrontIcon style={{ color: "white", fontSize: "30px" }} />
					</div>

					<div className="flex flex-col flex-grow">
						<div className="flex justify-between">
							<h3 className="font-bold text-lg text-black">Total Cafe</h3>
						</div>
						<p className="text-2xl font-semibold text-black">35</p>
						<div className="flex items-center gap-1 text-sm text-orange-600">
							{/* <span>+55% last month</span> */}
						</div>
					</div>
				</div>
			</div>
			<br />
			<div className="overflow-x-auto">
				<div className="flex justify-end">
					<button className="btn btn-sm btn-warning" onClick={downloadQR}>
						<FileDownloadOutlinedIcon />
						Download QR
					</button>
				</div>
				<table className="table">
					<thead>
						<tr>
							<th></th>
							<th>Cafe Name</th>
							<th>Owner</th>
							<th>Account No.</th>
							<th>Bank Name</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{cafe?.map((d, i) => {
							return (
								<>
									<tr className="hover" key={d.id}>
										<th>{i + 1}</th>
										<td>{d.cafe_name}</td>
										<td>{d.owner_name}</td>
										<td>{d.account_no || "N/A"}</td>
										<td>{d.bank || "N/A"}</td>
										<td>
											<BtnSuspend
												onClick={() => onSuspend(d.user_id, d.user.is_active)}
												active={d.user.is_active}
											/>
										</td>
										<td>
											<Link
												to={`transaction/${d.id}`}
												className="btn btn-ghost btn-xs"
											>
												transactions
											</Link>
										</td>
									</tr>
								</>
							);
						})}
					</tbody>
				</table>
			</div>
		</Layout>
	);
}
