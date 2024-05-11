import Sidebar from "./sidebar";

export default function Layout({ children, title }) {
  return (
    <div className="max-w-screen-lg mx-auto px-8">
      <div className="flex justify-between py-4">
        <h1 className="font-bold text-2xl">
          eKupon@<span className="text-yellow-400">UniSZA</span>
        </h1>
        <button className="btn btn-sm btn-error">Logout</button>
      </div>
      <div className="flex">
        <Sidebar />
        <div className="divider divider-horizontal mx-6"></div>
        <div>
          <h2 className="capitalize text-xl font-semibold mb-4">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
