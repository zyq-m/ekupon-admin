export default function Select({ label, options }) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select className="select select-bordered">
        <option>Pick one</option>
        {options.map((d, i) => {
          return (
            <>
              <option key={i} value={d.value}>
                {d.title}
              </option>
            </>
          );
        })}
      </select>
    </label>
  );
}
