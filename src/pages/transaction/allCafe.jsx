import { useEffect, useState } from "react";
import { Layout, Tablefilter, Modal, Loading } from "../../components";

import { api } from "../../services/axios";
import { useModal } from "../../hooks";

export default function TransactionAllCafe() {
  const [select, setSelect] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [byDate, setByDate] = useState({});
  const { error, showModal } = useModal();

  useEffect(() => {
    api
      .get("/admin/report/transaction", {
        params: {
          fundType: select,
          from: byDate?.from,
          to: byDate?.to,
        },
      })
      .then((res) => {
        setTransaction(res.data);
      })
      .catch((err) => {
        showModal(err.response.data.message);
      });
  }, [byDate?.from, byDate?.to, select]);

  if (!transaction.transaction?.length) {
    return (
      <Layout title="cafe Transaction Report">
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout title="Cafe Transaction Report">
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
              <th>Account No.</th>
              <th>Bank Name</th>
              <th>Transaction</th>
              <th>Total(RM)</th>
            </tr>
          </thead>
          <tbody>
            {transaction.transaction?.map((d, i) => {
              return (
                <>
                  <tr className="hover" key={d.id}>
                    <th>{i + 1}</th>
                    <td>{d.cafeName}</td>
                    <td>{d.premise}</td>
                    <td>{d.name}</td>
                    <td>{d.accountNo || "N/A"}</td>
                    <td>{d.bank || "N/A"}</td>
                    <td>{d.totalTransaction}</td>
                    <td>{d.totalAmount}</td>
                  </tr>
                </>
              );
            })}
            <tr className="font-bold">
              <td colSpan="5"></td>
              <td>Total</td>
              <td>{transaction?.total.totalTransaction}</td>
              <td>{transaction?.total.totalAmount}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Modal error={error} />
    </Layout>
  );
}
