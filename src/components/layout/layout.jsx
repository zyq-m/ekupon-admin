import Sidebar from "./sidebar";

export default function Layout({ children, title }) {
  return (
    <div className="max-w-screen-lg mx-auto px-8 pb-16">
      <div>
        <h1>EkuponAdmin</h1>
      </div>
      <div className="flex">
        <Sidebar />
        <div className="divider divider-horizontal"></div>
        <div>
          <h2>{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
