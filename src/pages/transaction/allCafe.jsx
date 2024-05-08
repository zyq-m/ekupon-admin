import { useId } from "react";
import { Layout } from "../../components";

import { fundType } from "../registration/student";

export default function TransactionAllCafe() {
  const cafe = [
    {
      id: useId(),
      name: "Test",
      cafeName: "Test",
      status: true,
      accountNo: "00000",
      bank: "Rakyat",
      transaction: 10,
      total: 50,
    },
    {
      id: useId(),
      name: "Test",
      cafeName: "Test",
      status: true,
      accountNo: "00000",
      bank: "Rakyat",
      transaction: 10,
      total: 50,
    },
    {
      id: useId(),
      name: "Test",
      cafeName: "Test",
      status: true,
      accountNo: "00000",
      bank: "Rakyat",
      transaction: 10,
      total: 50,
    },
  ];

  return (
    <Layout title="Cafe Transaction Summary">
      <div className="overflow-x-auto">
        <div className="flex justify-between gap-2">
          <div>
            <select className="select select-bordered select-sm">
              <option>Fund type</option>
              {fundType.map((d, i) => {
                return (
                  <>
                    <option key={i} value={d.value}>
                      {d.title}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
          <div className="flex gap-2">
            <label className="input input-bordered input-sm flex items-center gap-2">
              From
              <input type="date" className="grow" />
            </label>
            <label className="input input-bordered input-sm flex items-center gap-2">
              To
              <input type="date" className="grow" />
            </label>
            <button className="btn btn-accent btn-sm">Find</button>
            <button className="btn btn-accent btn-sm">Print</button>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cafe Name</th>
              <th>Account No.</th>
              <th>Bank</th>
              <th>Transaction</th>
              <th>Total(RM)</th>
            </tr>
          </thead>
          <tbody>
            {cafe.map((d, i) => {
              return (
                <>
                  <tr className="hover" key={d.id}>
                    <th>{i + 1}</th>
                    <td>{d.name}</td>
                    <td>{d.cafeName}</td>
                    <td>{d.accountNo}</td>
                    <td>{d.bank}</td>
                    <td>{d.transaction}</td>
                    <td>{d.total}</td>
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
