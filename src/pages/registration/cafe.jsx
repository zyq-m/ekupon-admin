import { useState } from "react";
import { Layout, TextInput, TextArea, Modal } from "../../components";

import { api } from "../../services/axios";
import { useModal } from "../../hooks";

export default function CafeRegister() {
  const { error, showModal } = useModal();
  const [form, setForm] = useState({
    cafeId: "",
    cafeName: "",
    accountNo: "",
    name: "",
    phoneNo: "",
    address: "",
    password: "",
  });

  async function onRegister(e) {
    e.preventDefault();
    try {
      await api.post("/admin/user/register/cafe", form);
      setForm({
        cafeId: "",
        cafeName: "",
        accountNo: "",
        name: "",
        phoneNo: "",
        address: "",
        password: "",
      });
    } catch (error) {
      showModal(error.response.data.error);
    }
  }

  return (
    <Layout title="Register Cafe">
      <form className="grid grid-cols-2 gap-4" onSubmit={onRegister}>
        <TextInput
          label="Name"
          type="text"
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Full Name"
        />
        <TextInput
          label="Cafe Name"
          type="text"
          value={form.cafeName}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, cafeName: e.target.value }))
          }
        />
        <TextInput
          label="Account No."
          type="text"
          value={form.accountNo}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, accountNo: e.target.value }))
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
          <TextArea
            label="Address"
            placeholder="Cafe address"
            value={form.address}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, address: e.target.value }))
            }
          />
          <TextInput
            label="Username"
            type="text"
            placeholder="Username for account"
            value={form.cafeId}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, cafeId: e.target.value }))
            }
          />
          <TextInput
            label="Password"
            type="password"
            placeholder="Password for account"
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>
        <button className="btn btn-accent col-span-2">Register</button>
      </form>
      <Modal error={error} />
    </Layout>
  );
}
