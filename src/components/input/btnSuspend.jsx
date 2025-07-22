export default function BtnSuspend({ active, onClick }) {
	return (
		<button
			className={`btn ${active ? "btn-accent" : "btn-error"} btn-xs`}
			onClick={onClick}
		>
			{active ? "active" : "suspended"}
		</button>
	);
}
