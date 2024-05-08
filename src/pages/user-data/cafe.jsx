import { useId } from "react";
import { Layout } from "../../components";

export default function CafeData() {
  const cafe = [
    {
      id: useId(),
      name: "Test",
      cafeName: "Test",
      status: true,
      accountNo: "00000",
    },
    {
      id: useId(),
      name: "Test",
      cafeName: "Test",
      status: true,
      accountNo: "00000",
    },
    {
      id: useId(),
      name: "Test",
      cafeName: "Test",
      status: true,
      accountNo: "00000",
    },
  ];

  return (
    <Layout title="Cafe">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cafe Name</th>
              <th>Account No.</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cafe.map((d, i) => {
              return (
                <>
                  <tr className="hover">
                    <th>{i + 1}</th>
                    <td>{d.name}</td>
                    <td>{d.cafeName}</td>
                    <td>{d.accountNo}</td>
                    <td>{d.status ? "active" : "suspended"}</td>
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
