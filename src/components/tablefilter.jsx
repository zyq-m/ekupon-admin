import { useState } from "react";
import { fundType as data } from "../pages/registration/student";

export default function Tablefilter({
  fundType,
  print,
  date,
  setSelect,
  setDate,
}) {
  const [byDate, setByDate] = useState({});

  function onSelect(e) {
    return setSelect(e.target.value);
  }

  function onDate() {
    return setDate(byDate);
  }

  return (
    <div className="flex justify-between gap-2 mb-4">
      {fundType && (
        <div>
          <select
            className="select select-bordered select-sm"
            onChange={onSelect}
          >
            <option value="">Fund type</option>
            {data?.map((d, i) => {
              return (
                <>
                  <option key={i} value={d.value}>
                    {d.title}
                  </option>
                </>
              );
            })}
          </select>
        </div>
      )}
      {date && (
        <div className="flex gap-2">
          <label className="input input-bordered input-sm flex items-center gap-2">
            From
            <input
              type="date"
              className="grow"
              onChange={(e) =>
                setByDate((prev) => ({ ...prev, from: e.target.value }))
              }
            />
          </label>
          <label className="input input-bordered input-sm flex items-center gap-2">
            To
            <input
              type="date"
              className="grow"
              onChange={(e) =>
                setByDate((prev) => ({ ...prev, to: e.target.value }))
              }
            />
          </label>
          <button className="btn btn-accent btn-sm" onClick={onDate}>
            Find
          </button>
          {print && <button className="btn btn-accent btn-sm">Print</button>}
        </div>
      )}
    </div>
  );
}
