import { useEffect, useState } from "react";
import { api } from "../services/axios";

export default function Tablefilter({
	fundType,
	print,
	date,
	setSelect,
	setDate,
}) {
	const [byDate, setByDate] = useState({ to: "", from: "" });
	const [data, setData] = useState([]);
	const [selected, setSelected] = useState("");

	function onSelect(e) {
		setSelected(e.target.value);
		return setSelect(e.target.value);
	}

	function onDate() {
		return setDate(byDate);
	}

	async function fetchFundType() {
		api.get("/limit")
			.then((res) => {
				setData(() => {
					return res.data.map((d) => ({
						id: d.id,
						title: d.role.name,
						value: d.role.name,
					}));
				});
			})
			.catch((err) => {
				console.error(err);
			});
	}

	async function onPdf() {
		try {
			const res = await api.get(`/admin/report/transaction/pdf`, {
				params: {
					fundType: selected,
					from: byDate.from,
					to: byDate.to,
				},
			});
			window.open("", "_blank").document.write(res.data);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fundType && fetchFundType();
	}, [fundType]);

	return (
		<div className="flex justify-between gap-2 mb-4">
			{fundType && (
				<div>
					<select
						className="select select-bordered select-sm"
						onChange={onSelect}
					>
						<option value="">Fund type</option>
						{data?.map((d, i) => {
							return (
								<>
									<option key={i} value={d.value}>
										{d.title}
									</option>
								</>
							);
						})}
					</select>
				</div>
			)}
			{date && (
				<div className="flex gap-2">
					<label className="input input-bordered input-sm flex items-center gap-2">
						From
						<input
							type="date"
							className="grow"
							onChange={(e) =>
								setByDate((prev) => ({
									...prev,
									from: e.target.value,
								}))
							}
						/>
					</label>
					<label className="input input-bordered input-sm flex items-center gap-2">
						To
						<input
							type="date"
							className="grow"
							onChange={(e) =>
								setByDate((prev) => ({
									...prev,
									to: e.target.value,
								}))
							}
						/>
					</label>
					<button className="btn btn-accent btn-sm" onClick={onDate}>
						Find
					</button>
					{print && (
						<button
							className="btn btn-accent btn-sm"
							onClick={onPdf}
						>
							Print
						</button>
					)}
				</div>
			)}
		</div>
	);
}
