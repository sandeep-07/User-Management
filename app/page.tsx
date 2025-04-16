"use client";
import { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { getColumns } from "./utils";
import { User } from "./types";
import { useGetUsers } from "./hooks/useGetUsers";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ACTION } from "./constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Home() {
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
  });
  const [config, setConfig] = useState<{
    sort: string[];
  }>({ sort: [] });

  const [selectedItem, setSelectedItem] = useState<User | null>(null);
  const [action, setAction] = useState<string | null>(null);

  const handleActionClick = (action: "view" | "edit" | "delete", row: User) => {
    console.log("action", action);
    console.log("row", row);
    setSelectedItem(row);
    setAction(action);
  };
  const columnns = getColumns({ config, setConfig, handleActionClick });

  const { data, isLoading } = useGetUsers({
    page: pagination.pageIndex,
    limit: pagination.pageSize,
    sort: config.sort,
  });

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
      <h1 className="text-2xl my-2 font-bold ">Users Management</h1>
      <AlertDialog open={selectedItem !== null}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {ACTION[(action as keyof typeof ACTION) ?? "view"].title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              <DialogContent item={selectedItem} action={action} />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedItem(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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

const DialogContent = ({
  item,
  action,
}: {
  item: User | null;
  action: string | null;
}) => {
  if (!item) return null;
  switch (action) {
    case "view":
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Field</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">ID</TableCell>
              <TableCell>{item.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Name</TableCell>
              <TableCell>{item.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Email</TableCell>
              <TableCell>{item.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
    case "edit":
      return <div></div>;
    case "delete":
      return <div></div>;
    default:
      return null;
  }
};
