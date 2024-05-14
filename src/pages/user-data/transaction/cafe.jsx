import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Layout,
  TransactionTable,
  Tablefilter,
  Modal,
  Loading,
} from "../../../components";
import { api } from "../../../services/axios";
import { useModal } from "../../../hooks";

export default function CafeTransaction() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState([]);
  const [cafeName, setCafeName] = useState("");
  const [select, setSelect] = useState("");
  const { error, showModal } = useModal();

  useEffect(() => {
    api
      .get(`/admin/cafe/transactions/${id}`, { params: { fundType: select } })
      .then((res) => {
        setTransaction(res.data);
        setCafeName(res.data.data[0].transaction.cafe.name);
      })
      .catch((err) => {
        showModal(err.response.data.message);
      });
  }, [id, select]);

  if (!transaction.length) {
    return (
      <Layout title={cafeName}>
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout title={cafeName}>
      <Tablefilter fundType={true} setSelect={(e) => setSelect(e)} />
      <TransactionTable cafe={true} data={transaction} />
      <Modal error={error} />
    </Layout>
  );
}
