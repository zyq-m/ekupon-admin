export default function Modal({ error }) {
  return (
    <dialog id="modal-alert" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Error</h3>
        <p className="py-4">{error}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
