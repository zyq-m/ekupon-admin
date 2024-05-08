import { Layout, TextInput, TextArea } from "../../components";

export default function CafeRegister() {
  return (
    <Layout title="Register Cafe">
      <form className="grid grid-cols-2 gap-4">
        <TextInput label="Name" type="text" placeholder="Full Name" />
        <TextInput label="Cafe Name" type="text" />
        <TextInput label="Account No." type="text" />
        <TextInput label="Phone No." type="tel" />
        <div className="grid gap-4 col-span-2">
          <TextArea label="Address" placeholder="Cafe address" />
          <TextInput
            label="Username"
            type="text"
            placeholder="Username for account"
          />
          <TextInput
            label="Password"
            type="password"
            placeholder="Password for account"
          />
        </div>
        <button className="btn btn-accent col-span-2">Register</button>
      </form>
    </Layout>
  );
}
