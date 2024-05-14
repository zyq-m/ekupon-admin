import { useState } from "react";
import { Modal, TextInput } from "../components";

import { login } from "../api/auth";
import { useModal } from "../hooks";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credential, setCredential] = useState({});
  const { error, showModal } = useModal();
  const navigate = useNavigate();

  async function onLogin(e) {
    e.preventDefault();

    try {
      await login(credential.email, credential.password);
      navigate("/ekupon-admin/dashboard");
    } catch (error) {
      showModal(error.response.data);
    }
  }

  return (
    <div className="grid place-content-center min-h-screen">
      <form className="grid" onSubmit={onLogin}>
        <div className="font-bold text-3xl mb-4">
          eKupon@<span className="text-yellow-400">UniSZA</span>
        </div>
        <TextInput
          label="Email"
          type="email"
          onChange={(e) =>
            setCredential((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <TextInput
          label="Password"
          type="password"
          onChange={(e) =>
            setCredential((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <button className="mt-4 btn bg-yellow-400 hover:bg-yellow-500">
          Log In
        </button>
      </form>
      <Modal error={error} />
    </div>
  );
}
