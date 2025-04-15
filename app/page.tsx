import DataTable from "./components/DataTable";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold ">User Management</h1>
      <DataTable />
    </div>
  );
}
