export default function Select({ label, options, onChange }) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select className="select select-bordered" onChange={onChange}>
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
