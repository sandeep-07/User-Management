"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/DataTable";
import { getColumns } from "./utils";
import { User } from "./types";
import { useGetUsers } from "./hooks/useGetUsers";
import { useMutateUser } from "./hooks/useMutateUser";
import { DialogUI } from "@/components/UserDialog";
import { CreateUser } from "@/components/CreateUser";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  );
}

function HomePage() {
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
  });
  const [config, setConfig] = useState<{
    sort: string[];
  }>({ sort: [] });

  const [selectedItem, setSelectedItem] = useState<User | null>(null);
  const [action, setAction] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const {
    createUser,
    updateUser,
    deleteUser,
    isLoading: isMutating,
  } = useMutateUser();

  const handleActionClick = (action: "view" | "edit" | "delete", row: User) => {
    setOpen(true);
    setSelectedItem(row);
    setAction(action);
  };

  const columnns = getColumns({
    config,
    setConfig,
    handleActionClick,
  });

  const { data, isLoading } = useGetUsers({
    page: pagination.pageIndex,
    limit: pagination.pageSize,
    sort: config.sort,
  });

  const handleAction = async (
    action: string | null,
    formData?: { name: string; email: string }
  ) => {
    console.log("action", action);
    console.log("formData", formData);
    try {
      switch (action) {
        case "edit":
          if (selectedItem && formData) {
            await updateUser({ ...selectedItem, ...formData });
          }
          break;
        case "delete":
          if (selectedItem) {
            await deleteUser(selectedItem.id);
          }
          break;
        case "create":
          if (formData) {
            await createUser(formData);
          }
          break;
      }
      setOpen(false);
      setSelectedItem(null);
    } catch (error) {
      console.error("Error handling action:", error);
    }
  };

  if (!data || isLoading) {
    return <div className="container mx-auto py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Data Table Explorer</h1>
        <p className="text-gray-500">
          A feature-rich data table with sorting, filtering, pagination, and
          CRUD operations.
        </p>
      </div>
      <h1 className="text-2xl my-2 font-bold">Users Management</h1>
      <CreateUser setAction={setAction} setOpen={setOpen} />
      <DialogUI
        open={open}
        setOpen={setOpen}
        action={action}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        onSubmit={handleAction}
        isLoading={isMutating}
      />
      <DataTable
        pagination={pagination}
        setPagination={setPagination}
        columns={columnns}
        headerClassName="text-gray-500 dark:bg-gray-800 dark:text-gray-400"
        pageCount={Math.ceil(
          Number(data?.headers["x-total-count"]) / pagination.pageSize
        )}
        data={data.data}
      />
    </div>
  );
}

export default App;
