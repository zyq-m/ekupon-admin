import { useEffect, useState } from "react";
import { Layout, Loading, Modal } from "../../components";
import { api } from "../../services/axios";
import { useModal } from "../../hooks";
import dayjs from "dayjs";

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentsIcon from '@mui/icons-material/Payments';
import PersonIcon from '@mui/icons-material/Person';

export default function Coupon() {
	const [limit, setLimit] = useState([]);
	const { error, showModal } = useModal();

	async function updateLimit(id) {
		const list = limit.filter((data) => data.id === id);
		try {
			await api.put("/fund", {
				...list[0],
			});

			showModal("Coupon updated");
		} catch (error) {
			console.error(error);
		}
	}

	function onLimitChange(e, id) {
		setLimit((prev) => {
			return prev.map((data) => {
				if (data.id === id) {
					return { ...data, limit_spend: +e.target.value };
				}
				return { ...data };
			});
		});
	}

	function onLimitTfChange(e, id) {
		setLimit((prev) => {
			return prev.map((data) => {
				if (data.id === id) {
					return { ...data, limit_per_tf: +e.target.value };
				}
				return { ...data };
			});
		});
	}

	useEffect(() => {
		api.get("/fund")
			.then((res) => {
				setLimit(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	if (!limit.length) {
		return (
			<Layout title="Coupon">
				<Loading />
			</Layout>
		);
	}

	return (
		<Layout title="Coupon">
			<div
				className="flex gap-4 flex-nowrap overflow-x-auto"
				style={{ whiteSpace: "nowrap" }}
			>
				<div
				className="flex items-center gap-4 bg-white shadow-md rounded-lg p-4 w-80"
				style={{ backgroundColor: "#f2f2f2" }}
				>
					<div className="flex items-center justify-center w-16 h-16 rounded-lg" style={{ backgroundColor: '#ffbe00'}}>
						<AttachMoneyIcon style={{ color: "white", fontSize: "30px" }} />
					</div>

					<div className="flex flex-col flex-grow">
						<div className="flex justify-between">
						<h3 className="font-bold text-lg text-black">Total Fund</h3>
						</div>
						<p className="text-2xl font-semibold text-black">RM135,000.00</p>
						<div className="flex items-center gap-1 text-sm text-orange-600">
						{/* <span>+55% last month</span> */}
						</div>
					</div>
				</div>

				<div
				className="flex items-center gap-4 bg-white shadow-md rounded-lg p-4 w-80"
				style={{ backgroundColor: "#f2f2f2" }}
				>
					<div className="flex items-center justify-center w-16 h-16 rounded-lg" style={{ backgroundColor: '#ffbe00'}}>
						<PaymentsIcon style={{ color: "white", fontSize: "30px" }} />
					</div>

					<div className="flex flex-col flex-grow">
						<div className="flex justify-between">
						<h3 className="font-bold text-lg text-black">Total Coupon</h3>
						</div>
						<p className="text-2xl font-semibold text-black">7</p>
						<div className="flex items-center gap-1 text-sm text-orange-600">
						{/* <span>+55% last month</span> */}
						</div>
					</div>
				</div>

				<div
				className="flex items-center gap-4 bg-white shadow-md rounded-lg p-4 w-80"
				style={{ backgroundColor: "#f2f2f2" }}
				>
					<div className="flex items-center justify-center w-16 h-16 rounded-lg" style={{ backgroundColor: '#ffbe00'}}>
						<PersonIcon style={{ color: "white", fontSize: "30px" }} />
					</div>

					<div className="flex flex-col flex-grow">
						<div className="flex justify-between">
						<h3 className="font-bold text-lg text-black">Total Student Received</h3>
						</div>
						<p className="text-2xl font-semibold text-black">385</p>
						<div className="flex items-center gap-1 text-sm text-orange-600">
						{/* <span>+55% last month</span> */}
						</div>
					</div>
				</div>
			</div>
			<br />
			<div className="overflow-x-auto">
				<table className="table">
					<thead>
						<tr>
							<th></th>
							<th>Coupon Name</th>
							<th>Start Use</th>
							<th>Expired</th>
							<th>Limit Per Transaction</th>
							<th>Limit Spend</th>
							<th>Amount(RM)</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{limit.map((d, i) => (
							<tr className="hover" key={d.id}>
								<th>{i + 1}</th>
								<td>{d.name}</td>
								<td>
									{dayjs(d.start_use).format("DD/MM/YYYY")}
								</td>
								<td>{dayjs(d.expired).format("DD/MM/YYYY")}</td>
								<td>
									<input
										type="number"
										value={d.limit_per_tf.toFixed(2)}
										className="input input-ghost input-sm w-24 text-center"
										onChange={(e) =>
											onLimitTfChange(e, d.id)
										}
									/>
								</td>
								<td>
									<input
										type="number"
										value={d.limit_spend.toFixed(2)}
										className="input input-ghost input-sm w-24 text-center"
										onChange={(e) => onLimitChange(e, d.id)}
									/>
								</td>
								<td>{d.amount.toFixed(2)}</td>
								<td>
									<button
										className="btn btn-ghost btn-xs"
										onClick={() => updateLimit(d.id)}
									>
										Update
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Modal error={error} title="Success" />
		</Layout>
	);
}
