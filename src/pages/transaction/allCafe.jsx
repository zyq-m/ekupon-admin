import { useEffect, useState } from "react";
import { Layout, Tablefilter, Modal, Loading } from "../../components";

import { api } from "../../services/axios";
import { useModal } from "../../hooks";
import { formatedNum } from "../../utils/helper";

export default function TransactionAllCafe() {
	const [select, setSelect] = useState("MAIDAM");
	const [transaction, setTransaction] = useState([]);
	const [byDate, setByDate] = useState({});
	const { error, showModal } = useModal();

	useEffect(() => {
		const fetch = async () => {
			try {
				const res = await api.get("/admin/report/transaction", {
					params: {
						fundType: select,
						from: byDate?.from,
						to: byDate?.to,
					},
				});
				setTransaction(res.data);
			} catch (error) {
				showModal(error.response.data.message);
			}
		};

		fetch();
	}, [byDate?.from, byDate?.to, select]);

	if (!transaction?.transaction?.length) {
		return (
			<Layout title="cafe Transaction Report">
				<Loading />
			</Layout>
		);
	}

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
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							{transaction?.transaction?.map((d, i) => {
								return (
									<>
										<tr className="hover" key={d.id}>
											<th>{i + 1}</th>
											<td>{d.cafeName}</td>
											<td>{d.premise}</td>
											<td>{d.name}</td>
											<td>{d.phoneNo}</td>
											<td>{d.accountNo || "N/A"}</td>
											<td>{d.bank || "N/A"}</td>{" "}
											<td className=" text-center">
												{formatedNum(
													d.totalTransaction
												)}
											</td>
											<td className="">
												{d.totalAmount}
											</td>
										</tr>
									</>
								);
							})}
							{transaction?.total && (
								<tr className="font-bold">
									<td colSpan="6"></td>
									<td>Total</td>
									<td className=" text-center">
										{formatedNum(
											transaction?.total?.totalTransaction
										)}
									</td>
									<td className="">
										{transaction?.total?.totalAmount}
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
