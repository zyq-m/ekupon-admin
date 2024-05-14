import { suspend } from "../../api/user";
import { useNavigate } from "react-router-dom";

export default function BtnSuspend({ userId, active }) {
  const navigate = useNavigate();

  async function onSuspend(id, active) {
    try {
      await suspend(id, active);
      navigate(0);
    } catch (err) {
      navigate(0);
    }
  }

  return (
    <button
      className={`btn ${active ? "btn-accent" : "btn-error"} btn-xs`}
      onClick={() => onSuspend(userId, !active)}
    >
      {active ? "active" : "suspended"}
    </button>
  );
}
