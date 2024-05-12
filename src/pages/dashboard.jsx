import { useState, useEffect } from "react";
import { Layout } from "../components";

import { socket } from "../services/io";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    student: 0,
    cafe: 0,
    coupon: 0,
  });

  useEffect(() => {
    socket.emit("admin:get-overall");
    socket.on("admin:get-overall", (data) => {
      setSummary(data);
    });
  }, []);

  return (
    <Layout title="Dashboard">
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title capitalize">Total student</div>
          <div className="stat-value">{summary.student}</div>
          <div className="stat-desc">students</div>
        </div>
        <div className="stat">
          <div className="stat-title capitalize">Total cafe</div>
          <div className="stat-value">{summary.cafe}</div>
          <div className="stat-desc">cafes</div>
        </div>
        <div className="stat">
          <div className="stat-title capitalize">Total transaction</div>
          <div className="stat-value">{summary.coupon}</div>
          <div className="stat-desc">transactions</div>
        </div>
      </div>
    </Layout>
  );
}
