import { useEffect, useState } from "react";
import { Layout, Loading, Modal } from "../components";
import { api } from "../services/axios";
import { useModal } from "../hooks";

export default function SpendLimit() {
  const [limit, setLimit] = useState([]);
  const { error, showModal } = useModal();

  async function updateLimit(roleId) {
    const list = limit.filter((data) => data.role.id === roleId);
    try {
      await api.put("/limit", {
        limit: list[0].limit,
        roleId: roleId,
      });

      showModal("Spend limit updated");
    } catch (error) {
      console.error(error);
    }
  }

  function onLimitChange(e, roleId) {
    setLimit((prev) => {
      return prev.map((data) => {
        if (data.role.id === roleId) {
          return { ...data, limit: +e.target.value };
        }
        return { ...data };
      });
    });
  }

  useEffect(() => {
    api
      .get("/limit")
      .then((res) => {
        setLimit(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!limit.length) {
    return (
      <Layout title="Spend Limit">
        <Loading />
      </Layout>
    );
  }

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
                    <td>{d.role.name}</td>
                    <td>
                      <input
                        type="number"
                        value={d.limit}
                        className="input input-ghost input-sm"
                        onChange={(e) => onLimitChange(e, d.role.id)}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => updateLimit(d.role.id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal error={error} title="Success" />
    </Layout>
  );
}
