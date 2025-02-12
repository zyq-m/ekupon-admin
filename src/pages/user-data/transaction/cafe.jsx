import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
	Layout,
	TransactionTable,
	Tablefilter,
	Modal,
} from "../../../components";
import { api } from "../../../services/axios";
import { useModal } from "../../../hooks";

export default function CafeTransaction() {
	const { id } = useParams();
	const [transaction, setTransaction] = useState([]);
	const [cafeName, setCafeName] = useState("");
	const [select, setSelect] = useState("");
	const [date, setDate] = useState({});
	const { error, showModal } = useModal();

	useEffect(() => {
		select &&
			api
				.get(`/transaction/cafe/${id}`, {
					params: { fundId: select, from: date?.from, to: date?.to },
				})
				.then((res) => {
					setTransaction(res.data);
					setCafeName(res.data[0].cafe.cafe_name);
				})
				.catch((err) => {
					showModal(err.response.data.message);
				});
	}, [id, select, date?.from, date?.to]);

	return (
		<Layout title={cafeName}>
			<Tablefilter
				fundType={true}
				date={true}
				setSelect={(e) => setSelect(e)}
				setDate={(e) => setDate(e)}
			/>
			<TransactionTable cafe={true} data={transaction} />
			<Modal error={error} />
		</Layout>
	);
}
