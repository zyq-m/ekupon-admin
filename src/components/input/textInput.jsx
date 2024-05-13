export default function TextInput({
  label,
  placeholder,
  type,
  onChange,
  value,
}) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
