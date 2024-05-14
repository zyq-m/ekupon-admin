import { useState, useEffect } from "react";
import { Layout, TextInput, TextArea, Select, Modal } from "../../components";
import { api } from "../../services/axios";
import { useModal } from "../../hooks";

export const fundType = [
  {
    title: "B40",
    value: "B40",
  },
  {
    title: "Maidam",
    value: "MAIDAM",
  },
  {
    title: "Paynet",
    value: "PAYNET",
  },
];

export default function StudentRegister() {
  const [form, setForm] = useState({
    matricNo: "",
    icNo: "",
    name: "",
    roleName: "",
    phoneNo: "",
    address: "",
  });
  const [fund, setFund] = useState([]);
  const { error, showModal } = useModal();

  async function onRegister(e) {
    e.preventDefault();

    try {
      await api.post("/admin/user/register/student".form);
      setForm({
        matricNo: "",
        icNo: "",
        name: "",
        roleName: "",
        phoneNo: "",
        address: "",
      });
    } catch (err) {
      showModal(err.response.data.error);
    }
  }

  useEffect(() => {
    api
      .get("/limit")
      .then((res) => {
        setFund(() => {
          return res.data.map((d) => ({
            id: d.id,
            title: d.role.name,
            value: d.role.name,
          }));
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Layout title="Register student">
      <form className="grid grid-cols-2 gap-4 max-w-lg" onSubmit={onRegister}>
        <TextInput
          label="Name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <TextInput
          label="IC No."
          type="text"
          value={form.icNo}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, icNo: e.target.value }))
          }
        />
        <TextInput
          label="Matric No."
          type="text"
          value={form.matricNo}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, matricNo: e.target.value }))
          }
        />
        <TextInput
          label="Phone No."
          type="tel"
          value={form.phoneNo}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, phoneNo: e.target.value }))
          }
        />
        <div className="grid gap-4 col-span-2">
          <Select
            label="Fund Type"
            options={fund}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, roleName: e.target.value }))
            }
          />
          <TextArea
            label="Address"
            placeholder="Student address"
            value={form.address}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, address: e.target.value }))
            }
          />
        </div>
        <button className="btn btn-accent col-span-2">Register</button>
      </form>
      <Modal error={error} />
    </Layout>
  );
}
