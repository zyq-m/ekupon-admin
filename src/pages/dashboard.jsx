import { useState } from "react";
import { Layout } from "../components";

export default function Dashboard() {
  const [summary, setSummary] = useState([
    {
      title: "total student",
      desc: "students",
      value: 0,
    },
    {
      title: "total cafe",
      desc: "cafes",
      value: 0,
    },
    {
      title: "total transaction",
      desc: "transactions",
      value: 0,
    },
  ]);

  return (
    <Layout title="Dashboard">
      <div className="stats shadow">
        {summary.map((d, i) => {
          return (
            <>
              <div key={i} className="stat">
                <div className="stat-title capitalize">{d.title}</div>
                <div className="stat-value">{d.value}</div>
                <div className="stat-desc">{d.desc}</div>
              </div>
            </>
          );
        })}
      </div>
    </Layout>
  );
}
