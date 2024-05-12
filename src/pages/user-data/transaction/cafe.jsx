import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Layout, TransactionTable, Tablefilter } from "../../../components";
import { api } from "../../../services/axios";

export default function CafeTransaction() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState([]);
  const [cafeName, setCafeName] = useState("");

  useEffect(() => {
    api
      .get(`/admin/cafe/transactions/${id}`)
      .then((res) => {
        setTransaction(res.data);
        setCafeName(res.data.data[0].transaction.cafe.name);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <Layout title={cafeName}>
      <Tablefilter fundType={true} />
      <TransactionTable cafe={true} data={transaction} />
    </Layout>
  );
}
