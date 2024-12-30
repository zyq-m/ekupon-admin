import { useEffect, useState } from "react";
import { Layout, Loading, Modal, TextInput } from "../../components";
import { api } from "../../services/axios";
import { useModal } from "../../hooks";
import dayjs from "dayjs";

export default function SetupCoupon() {
	const { error, showModal } = useModal();
	const [form, setForm] = useState({
		name: "",
		expired: "",
		start_use: dayjs().format("YYYY-MM-DD"),
		amount: 0,
		limit_spend: 0,
		limit_per_tf: 0,
	});

	async function onRegister(e) {
		e.preventDefault();
		try {
			await api.post("/fund", form);
			setForm({
				name: "",
				expired: "",
				start_use: dayjs().format("YYYY-MM-DD"),
				amount: 0,
				limit_spend: 0,
				limit_per_tf: 0,
			});
		} catch (error) {
			showModal(error.response.data.error);
		}
	}

	return (
		<Layout title="Setup new coupon">
			<form
				className="grid grid-cols-2 gap-4 max-w-lg"
				onSubmit={onRegister}
			>
				<TextInput
					label="Name"
					type="text"
					value={form.name}
					onChange={(e) =>
						setForm((prev) => ({
							...prev,
							name: e.target.value,
						}))
					}
					placeholder="Coupon name"
				/>
				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">Start use</span>
					</div>
					<input
						type="date"
						className="input input-bordered w-full"
						value={form.start_use}
						onChange={(e) =>
							setForm((prev) => ({
								...prev,
								start_use: e.target.value,
							}))
						}
					/>
				</label>
				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">Expired</span>
					</div>
					<input
						type="date"
						className="input input-bordered w-full"
						value={form.expired}
						onChange={(e) =>
							setForm((prev) => ({
								...prev,
								expired: e.target.value,
							}))
						}
					/>
				</label>
				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">Amount(RM)</span>
					</div>
					<input
						type="number"
						className="input input-bordered w-full"
						value={form.amount}
						onChange={(e) =>
							setForm((prev) => ({
								...prev,
								amount: e.target.value,
							}))
						}
					/>
				</label>
				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">Limit Spend(RM)</span>
					</div>
					<input
						type="number"
						className="input input-bordered w-full"
						value={form.limit_spend}
						onChange={(e) =>
							setForm((prev) => ({
								...prev,
								limit_spend: e.target.value,
							}))
						}
					/>
				</label>
				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">
							Limit Per Transaction(RM)
						</span>
					</div>
					<input
						type="number"
						className="input input-bordered w-full"
						value={form.limit_per_tf}
						onChange={(e) =>
							setForm((prev) => ({
								...prev,
								limit_per_tf: e.target.value,
							}))
						}
					/>
				</label>
				<div className="card-actions justify-end col-span-2">
					<button
						type="submit"
						className="mt-4 btn bg-yellow-400 hover:bg-yellow-500"
					>
						Done
					</button>
				</div>
			</form>
			<Modal error={error} title="Success" />
		</Layout>
	);
}
