"use client";
import { useCallback, useMemo, useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { getColumns } from "./utils";
import { User } from "./types";
import { useGetUsers } from "./hooks/useGetUsers";
import { useMutateUser } from "./hooks/useMutateUser";
import { DialogUI } from "@/components/UserDialog";
import { CreateUser } from "@/components/CreateUser";
import { Input } from "@/components/ui/input";
import { useDebounce } from "./hooks/useDebounce";

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
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 1000);

  const {
    createUser,
    updateUser,
    deleteUser,
    isLoading: isMutating,
  } = useMutateUser({
    page: pagination.pageIndex,
    limit: pagination.pageSize,
    sort: config.sort,
    query: debouncedQuery,
  });

  const handleActionClick = useCallback(
    (action: "view" | "edit" | "delete", row: User) => {
      setOpen(true);
      setSelectedItem(row);
      setAction(action);
    },
    []
  );

  const columns = useMemo(
    () => getColumns({ config, setConfig, handleActionClick }),
    [config, handleActionClick]
  );

  const { data, isLoading } = useGetUsers({
    page: pagination.pageIndex,
    limit: pagination.pageSize,
    sort: config.sort,
    query: debouncedQuery,
  });

  const handleAction = useCallback(
    async (
      action: string | null,
      formData?: { name: string; email: string }
    ) => {
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
    },
    [selectedItem, createUser, updateUser, deleteUser]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

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
      <div className="w-full flex justify-between">
        <Input
          className="w-[400px]"
          placeholder="Search by name"
          onChange={handleSearchChange}
          value={query}
        />
        <CreateUser setAction={setAction} setOpen={setOpen} />
      </div>
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
        columns={columns}
        headerClassName="text-gray-500 dark:bg-gray-800 dark:text-gray-400"
        pageCount={Math.ceil(
          Number(data?.headers["x-total-count"]) / pagination.pageSize
        )}
        data={data.data}
      />
    </div>
  );
}

export default HomePage;
