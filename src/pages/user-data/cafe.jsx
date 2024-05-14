import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, BtnSuspend, Loading } from "../../components";

import { api } from "../../services/axios";

export default function CafeData() {
  const [cafe, setCafe] = useState([]);

  useEffect(() => {
    api
      .get("/admin/cafe")
      .then((res) => {
        setCafe(res.data.cafe);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!cafe.length) {
    return (
      <Layout title="Cafe data">
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout title="Cafe data">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Cafe Name</th>
              <th>Owner</th>
              <th>Account No.</th>
              <th>Bank Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cafe?.map((d, i) => {
              return (
                <>
                  <tr className="hover" key={d.id}>
                    <th>{i + 1}</th>
                    <td>{d.name}</td>
                    <td>{d.user.profile.name}</td>
                    <td>{d.accountNo || "N/A"}</td>
                    <td>{d.bank || "N/A"}</td>
                    <td>
                      <BtnSuspend active={d.user.active} userId={d.userId} />
                    </td>
                    <td>
                      <Link
                        to={`transaction/${d.id}`}
                        className="btn btn-ghost btn-xs"
                      >
                        transactions
                      </Link>
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
