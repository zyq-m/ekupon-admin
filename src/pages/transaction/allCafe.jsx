import { useEffect, useState } from "react";
import { Layout, Tablefilter, Modal } from "../../components";

import { api } from "../../services/axios";
import { useModal } from "../../hooks";

export default function TransactionAllCafe() {
	const [select, setSelect] = useState("");
	const [transaction, setTransaction] = useState([]);
	const [byDate, setByDate] = useState({});
	const { error, showModal } = useModal();

	useEffect(() => {
		const fetch = async () => {
			try {
				const res = await api.get("/transaction/cafe", {
					params: {
						fundId: select,
						from: byDate.from,
						to: byDate.to,
					},
				});
				setTransaction(res.data);
			} catch (error) {
				showModal(error.response.data.message);
			}
		};

		select && fetch();
	}, [byDate?.from, byDate?.to, select]);

	return (
		<Layout title="Cafe Transaction Report">
			<div>
				<Tablefilter
					fundType={true}
					date={true}
					print={true}
					setSelect={(e) => setSelect(e)}
					setDate={(e) => setByDate(e)}
				/>
				<div className="overflow-x-auto">
					<table className="table">
						<thead>
							<tr>
								<th></th>
								<th>Company Name</th>
								<th>Premise Address</th>
								<th>Owner Name/Founder</th>
								<th>Phone No.</th>
								<th>Account No.</th>
								<th>Bank Name</th>
								<th>Transaction</th>
								<th>Total(RM)</th>
							</tr>
						</thead>
						<tbody>
							{transaction?.transactions?.map((d, i) => (
								<tr className="hover" key={d.id}>
									<th>{i + 1}</th>
									<td>{d.cafe_name}</td>
									<td>{d.premise}</td>
									<td>{d.owner_name}</td>
									<td>{d.no_tel}</td>
									<td>{d.account_no || "N/A"}</td>
									<td>{d.bank || "N/A"}</td>{" "}
									<td className=" text-center">
										{d.totalTransaction}
									</td>
									<td className="text-center">
										{d.totalAmount.toFixed(2)}
									</td>
								</tr>
							))}
							{transaction?.summary && (
								<tr className="font-bold">
									<td colSpan="6"></td>
									<td>Total</td>
									<td className=" text-center">
										{transaction?.summary?.totalTf}
									</td>
									<td className="">
										{transaction?.summary?.totalAmount.toFixed(
											2
										)}
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
				<Modal error={error} />
			</div>
		</Layout>
	);
}
