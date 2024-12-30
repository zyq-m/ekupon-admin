import { useEffect, useState } from "react";
import { Layout, Loading, Modal } from "../components";
import { api } from "../services/axios";
import { useModal } from "../hooks";
import dayjs from "dayjs";

export default function SpendLimit() {
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
			<Layout title="Spend Limit">
				<Loading />
			</Layout>
		);
	}

	return (
		<Layout title="Spend Limit">
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
										className="input input-ghost input-sm"
										onChange={(e) =>
											onLimitTfChange(e, d.id)
										}
									/>
								</td>
								<td>
									<input
										type="number"
										value={d.limit_spend.toFixed(2)}
										className="input input-ghost input-sm"
										onChange={(e) => onLimitChange(e, d.id)}
									/>
								</td>
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
