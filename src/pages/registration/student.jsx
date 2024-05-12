import { Layout, TextInput, TextArea, Select } from "../../components";

export const fundType = [
  {
    title: "B40",
    value: "B40",
  },
  {
    title: "Maidam",
    value: "MAIDAM",
  },
  {
    title: "Paynet",
    value: "PAYNET",
  },
];

export default function StudentRegister() {
  return (
    <Layout title="Register student">
      <form className="grid grid-cols-2 gap-4">
        <TextInput label="Name" type="text" placeholder="Full Name" />
        <TextInput label="IC No." type="text" />
        <TextInput label="Matric No." type="text" />
        <TextInput label="Phone No." type="tel" />
        <div className="grid gap-4 col-span-2">
          <Select label="Fund Type" options={fundType} />
          <TextArea label="Address" placeholder="Student address" />
        </div>
        <button className="btn btn-accent col-span-2">Register</button>
      </form>
    </Layout>
  );
}
