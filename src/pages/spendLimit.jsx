import { Layout } from "../components";

const limit = [
  {
    role: "MAIDAM",
    limit: 5,
  },
  {
    role: "B40",
    limit: 5,
  },
];

export default function SpendLimit() {
  return (
    <Layout title="Spend Limit">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Role</th>
              <th>Limit Spend</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {limit.map((d, i) => {
              return (
                <>
                  <tr className="hover" key={d.id}>
                    <th>{i + 1}</th>
                    <td>{d.role}</td>
                    <td>
                      <input
                        type="number"
                        value={d.limit}
                        className="input input-ghost input-sm"
                      />
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-xs">Update</button>
                    </td>
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
