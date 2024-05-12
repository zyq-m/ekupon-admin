import { useEffect, useState } from "react";
import { Layout, Tablefilter } from "../../components";

import { api } from "../../services/axios";

export default function TransactionAllCafe() {
  const [select, setSelect] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [byDate, setByDate] = useState({});

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
        setTransaction(res.data.transaction);
      });
  }, [byDate?.from, byDate?.to, select]);

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
              <th>Name</th>
              <th>Cafe Name</th>
              <th>Account No.</th>
              <th>Bank</th>
              <th>Total Transaction</th>
              <th>Total(RM)</th>
            </tr>
          </thead>
          <tbody>
            {transaction?.map((d, i) => {
              return (
                <>
                  <tr className="hover" key={d.id}>
                    <th>{i + 1}</th>
                    <td>{d.name}</td>
                    <td>{d.cafeName}</td>
                    <td>{d.accountNo}</td>
                    <td>{d.bank || "N/A"}</td>
                    <td>{d.totalTransaction}</td>
                    <td>{d.totalAmount}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
