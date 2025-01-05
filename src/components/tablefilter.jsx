import { useEffect, useState } from "react";
import { api } from "../services/axios";
import dayjs from "dayjs";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

export default function Tablefilter({
	fundType,
	print,
	date,
	setSelect,
	setDate,
}) {
	const navigate = useNavigate();
	const location = useLocation();
	const params = new URLSearchParams(location.search);

	const [byDate, setByDate] = useState({
		to: dayjs().endOf("week").format("YYYY-MM-DD"),
		from: dayjs().startOf("week").format("YYYY-MM-DD"),
	});
	const [data, setData] = useState([]);
	const [selected, setSelected] = useState(params.get("fundId") ?? 1);

	function onSelect(e) {
		setSelected(e.target.value);
		return setSelect(e.target.value);
	}

	function onDate() {
		return setDate(byDate);
	}
	function initSelect() {
		return setSelect(selected);
	}

	async function fetchFundType() {
		api.get("/fund")
			.then((res) => {
				setData(() => {
					return res.data.map((d) => ({
						id: d.id,
						title: d.name,
						value: d.id,
						selected: d.id == selected,
					}));
				});
			})
			.catch((err) => {
				console.error(err);
			});
	}

	async function onPdf() {
		try {
			const res = await api.get(`/transaction/cafe`, {
				params: {
					fundId: selected,
					from: byDate.from,
					to: byDate.to,
					pdf: true,
				},
			});
			window.open("test", "_blank").document.write(res.data);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		fundType && fetchFundType();
		date && onDate();
		initSelect();
	}, [fundType]);

	useEffect(() => {
		navigate({
			pathname: location.pathname,
			search: `${createSearchParams({ fundId: selected })}`,
		});
	}, [selected, fundType]);

	return (
		<div className="flex justify-between gap-2 mb-4">
			{fundType && (
				<div>
					<select
						className="select select-bordered select-sm"
						onChange={onSelect}
					>
						<option value="">Fund type</option>
						{data?.map((d, i) => (
							<option
								key={i}
								value={d.value}
								selected={d.selected}
							>
								{d.title}
							</option>
						))}
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
							value={byDate.from}
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
							value={byDate.to}
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
