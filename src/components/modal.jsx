export default function Modal({ error, title }) {
  return (
    <dialog id="modal-alert" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-red-500">Alert</h3>
        <p className="py-4">{error}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-accent">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
