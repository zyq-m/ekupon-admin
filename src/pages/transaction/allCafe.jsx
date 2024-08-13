import { useEffect, useState } from "react";
import { Layout, Tablefilter, Modal, Loading } from "../../components";

import { api } from "../../services/axios";
import { useModal } from "../../hooks";

export default function TransactionAllCafe() {
  const [select, setSelect] = useState("MAIDAM");
  const [transaction, setTransaction] = useState([]);
  const [transactionOld, setTransactionOld] = useState([]);
  const [byDate, setByDate] = useState({});
  const { error, showModal } = useModal();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await Promise.all(
          ["/admin/report/transaction/old", "/admin/report/transaction"].map(
            (url) =>
              api.get(url, {
                params: {
                  fundType: select,
                  from: byDate?.from,
                  to: byDate?.to,
                },
              })
          )
        );

        setTransactionOld(res[0].data);
        setTransaction(res[1].data);
      } catch (error) {
        showModal(error.response.data.message);
      }
    };

    fetch();
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
                <th colSpan="7"></th>
                <th colSpan="2" className="text-center bg-red-300">
                  Old
                </th>
                <th colSpan="2" className="text-center bg-blue-300">
                  Latest
                </th>
              </tr>
              <tr>
                <th></th>
                <th>Company Name</th>
                <th>Premise Address</th>
                <th>Owner Name/Founder</th>
                <th>Phone No.</th>
                <th>Account No.</th>
                <th>Bank Name</th>
                <th className="bg-red-300">Transaction</th>
                <th className="bg-red-300">Total (RM)</th>
                <th className="bg-blue-300">Transaction</th>
                <th className="bg-blue-300">Total</th>
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
                      <td>{d.phoneNo}</td>
                      <td>{d.accountNo || "N/A"}</td>
                      <td>{d.bank || "N/A"}</td>
                      <td className="bg-red-300 text-center">
                        {
                          transactionOld.transaction.filter(
                            (t) => t.id === d.id
                          )[0]?.totalTransaction
                        }
                      </td>
                      <td className="bg-red-300">
                        {
                          transactionOld.transaction.filter(
                            (t) => t.id === d.id
                          )[0]?.totalAmount
                        }
                      </td>
                      <td className="bg-blue-300 text-center">
                        {d.totalTransaction}
                      </td>
                      <td className="bg-blue-300">{d.totalAmount}</td>
                    </tr>
                  </>
                );
              })}
              {transaction?.total && (
                <tr className="font-bold">
                  <td colSpan="6"></td>
                  <td>Total</td>
                  <td className="bg-red-300 text-center">
                    {transactionOld?.total?.totalTransaction}
                  </td>
                  <td className="bg-red-300">{`RM ${transactionOld?.total?.totalAmount}`}</td>
                  <td className="bg-blue-300 text-center">
                    {transaction?.total?.totalTransaction}
                  </td>
                  <td className="bg-blue-300">
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
