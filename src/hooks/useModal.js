import { useState } from "react";

export default function useModal() {
  const [error, setError] = useState("");

  function showModal(erorMsg) {
    setError(erorMsg);
    document.getElementById("modal-alert").showModal();
  }

  return {
    showModal,
    error,
  };
}
