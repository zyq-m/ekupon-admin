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

export default function StudentTransaction() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState([]);
  const [studentName, setStudentName] = useState("");
  const { error, showModal } = useModal();

  useEffect(() => {
    api
      .get(`/admin/student/transactions/${id}`)
      .then((res) => {
        setTransaction(res.data);
        setStudentName(
          `${res.data.data[0].transaction.student.user.profile.name} (${res.data.data[0].transaction.matricNo})`
        );
      })
      .catch((err) => {
        showModal(err.response.data.message);
      });
  }, [id]);

  return (
    <Layout title={studentName}>
      <Tablefilter />
      <TransactionTable cafe={false} data={transaction} />
      <Modal error={error} />
    </Layout>
  );
}
