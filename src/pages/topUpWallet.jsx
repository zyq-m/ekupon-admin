import { useEffect, useState } from "react";
import { Layout, Tablefilter, Modal, Loading } from "../components";

import { api } from "../services/axios";
import { useModal } from "../hooks";

export default function TopUpWallet() {
  const [student, setStudent] = useState([]);
  const [select, setSelect] = useState();
  const [checkAll, setCheckAll] = useState(false);
  const [amount, setAmount] = useState("");
  const { error, showModal } = useModal();

  function onAllChecked(e) {
    const { checked } = e.target;

    setCheckAll(checked);
    setStudent((prev) => prev.map((d) => ({ ...d, isChecked: checked })));
  }

  function onCheck(e) {
    const { id, checked } = e.target;
    setStudent((prev) => {
      return prev.map((d) => {
        if (d.matricNo == id) {
          setCheckAll(false);
          return { ...d, isChecked: checked };
        }

        return { ...d };
      });
    });
  }

  async function onTopup() {
    try {
      if (!select) {
        showModal("Please select fund type");
        return;
      }
      if (checkAll) {
        await api.put("/admin/student/coupon", {
          role: select,
          amount: amount,
        });
        setCheckAll(false);
      } else {
        await Promise.all(
          student
            .filter((d) => d.isChecked === true)
            .map(async (d) => {
              await api.put("/admin/student/coupon", {
                role: select,
                amount: amount,
                matricNo: d.matricNo,
              });
            })
        );
      }

      setAmount("");
      fetchData();
    } catch (error) {
      showModal(error.response.data.message);
    }
  }

  function fetchData() {
    api
      .get("/admin/student", { params: { fundType: select } })
      .then((res) => {
        setStudent(() =>
          res.data.student.map((d) => ({ ...d, isChecked: false }))
        );
      })
      .catch((err) => {
        showModal(err.response.data.message);
      });
  }

  useEffect(() => {
    fetchData();
  }, [select]);

  if (!student.length) {
    return (
      <Layout title="Top up wallet">
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout title="Top up wallet">
      <Tablefilter fundType={true} setSelect={(e) => setSelect(e)} />
      <div className="overflow-x-auto">
        <table className="table mb-4">
          <thead>
            <tr>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={onAllChecked}
                    checked={checkAll}
                  />
                </label>
              </th>
              <th>Name</th>
              <th>Matric No.</th>
              <th>Balance (RM)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {student?.map((d) => {
              return (
                <>
                  <tr className="hover" key={d.matricNo}>
                    <th>
                      <label>
                        <input
                          id={d.matricNo}
                          type="checkbox"
                          className="checkbox"
                          checked={d.isChecked}
                          onChange={onCheck}
                        />
                      </label>
                    </th>
                    <td className="capitalize">{d.user.profile.name}</td>
                    <td>{d.matricNo}</td>
                    <td>{d.coupon.total}</td>
                    <td>{d.user.active ? "active" : "suspended"}</td>
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
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button className="btn btn-accent btn-sm" onClick={onTopup}>
            Top up
          </button>
        </div>
      </div>
      <Modal error={error} />
    </Layout>
  );
}
