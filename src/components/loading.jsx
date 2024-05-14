export default function Loading() {
  return (
    <div
      className="grid place-content-center"
      style={{ minHeight: "calc(100vh - 12rem)" }}
    >
      <span className="loading loading-dots loading-lg"></span>
    </div>
  );
}
