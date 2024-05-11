import { TextInput } from "../components";

export default function Login() {
  return (
    <div className="grid place-content-center min-h-screen">
      <form className="grid">
        <div className="font-bold text-3xl mb-4">
          eKupon@<span className="text-yellow-400">UniSZA</span>
        </div>
        <TextInput label="Email" type="email" />
        <TextInput label="Password" type="password" />
        <button className="mt-4 btn bg-yellow-400 hover:bg-yellow-500">
          Log In
        </button>
      </form>
    </div>
  );
}
