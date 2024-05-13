import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Tablefilter, Modal } from "../../components";

import { api } from "../../services/axios";
import { useModal } from "../../hooks";

export default function StudentData() {
  const [student, setStudent] = useState([]);
  const [fund, setFund] = useState("");
  const { error, showModal } = useModal();

  useEffect(() => {
    api
      .get("/admin/student", { params: { fundType: fund } })
      .then((res) => setStudent(res.data.student))
      .catch((err) => {
        showModal(err.response.data.message);
      });
  }, [fund]);

  return (
    <Layout title="Student data">
      <Tablefilter fundType={true} setSelect={(e) => setFund(e)} />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
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
                  <tr className="hover" key={d.matricNo}>
                    <th>{i + 1}</th>
                    <td className="capitalize">{d.user.profile.name}</td>
                    <td>{d.matricNo}</td>
                    <td>{d.coupon.total}</td>
                    <td>
                      <button
                        className={`btn ${
                          d.user.active ? "btn-accent" : "btn-error"
                        } btn-xs`}
                      >
                        {d.user.active ? "active" : "suspended"}
                      </button>
                    </td>
                    <td>
                      <Link
                        to={`transaction/${d.matricNo}`}
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
      <Modal error={error} />
    </Layout>
  );
}
