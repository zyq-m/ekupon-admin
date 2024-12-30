import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Layout, TransactionTable, Modal } from "../../../components";
import { api } from "../../../services/axios";
import { useModal } from "../../../hooks";

export default function StudentTransaction() {
	const { id, fundId } = useParams();
	const [transaction, setTransaction] = useState([]);
	const [studentName, setStudentName] = useState("");
	const { error, showModal } = useModal();

	useEffect(() => {
		api.get(`/transaction/student/${id}`, { params: { fundId } })
			.then((res) => {
				setTransaction(res.data);
				setStudentName(
					`${res.data[0].student.name} (${res.data[0].student.matric_no})`
				);
			})
			.catch((err) => {
				showModal(err.response.data.message);
			});
	}, [id]);

	return (
		<Layout title={studentName}>
			<TransactionTable cafe={false} data={transaction} />
			<Modal error={error} />
		</Layout>
	);
}
