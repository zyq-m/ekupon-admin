export default function TextArea({ label, placeholder, value, onChange }) {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <textarea
        className="textarea textarea-bordered h-24"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></textarea>
    </label>
  );
}
