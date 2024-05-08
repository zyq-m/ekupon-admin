import { useId } from "react";
import { Layout } from "../components";

import { fundType } from "./registration/student";

export default function TopUpWallet() {
  const student = [
    {
      id: useId(),
      name: "Test",
      matricNo: "012345",
      status: true,
      balance: "400",
    },
    {
      id: useId(),
      name: "Test",
      matricNo: "012345",
      status: true,
      balance: "400",
    },
    {
      id: useId(),
      name: "Test",
      matricNo: "012345",
      status: true,
      balance: "400",
    },
  ];

  return (
    <Layout title="Student">
      <div className="overflow-x-auto">
        <div className="flex justify-end">
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
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Matric No.</th>
              <th>Balance (RM)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {student.map((d, i) => {
              return (
                <>
                  <tr className="hover" key={i}>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td className="capitalize">{d.name}</td>
                    <td>{d.matricNo}</td>
                    <td>{d.balance}</td>
                    <td>{d.status ? "active" : "suspended"}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>

        <div className="flex gap-4 justify-end">
          <input
            type="number"
            placeholder="amount"
            className="input input-bordered input-sm"
          />
          <button className="btn btn-accent btn-sm">Top up</button>
        </div>
      </div>
    </Layout>
  );
}
