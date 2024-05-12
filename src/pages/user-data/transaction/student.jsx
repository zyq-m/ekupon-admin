import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Layout, TransactionTable, Tablefilter } from "../../../components";
import { api } from "../../../services/axios";
export default function StudentTransaction() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState([]);
  const [studentName, setStudentName] = useState("");

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
        console.error(err);
      });
  }, [id]);

  return (
    <Layout title={studentName}>
      <Tablefilter />
      <TransactionTable cafe={false} data={transaction} />
    </Layout>
  );
}
