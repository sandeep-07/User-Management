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
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createUser } from "./api";

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
  const [open, setOpen] = useState(false);

  const handleActionClick = (action: "view" | "edit" | "delete", row: User) => {
    setOpen(true);
    console.log("action", action);
    console.log("row", row);
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
      <CreateUser setAction={setAction} open={open} setOpen={setOpen} />
      <DialogUI
        open={open}
        setOpen={setOpen}
        action={action}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
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

const CreateUser = ({
  setOpen,
  setAction,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAction: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  return (
    <Button
      onClick={() => {
        setOpen(true);
        setAction("create");
      }}
    >
      Add User
    </Button>
  );
};
const handleAction = (
  action: string | null,
  setSelectedItem: React.Dispatch<React.SetStateAction<User | null>>
) => {
  switch (action) {
    case "edit":
      console.log("edit");
      break;
    case "delete":
      console.log("delete");
      break;
    case "create":

    default:
      console.log("view");
  }
  setSelectedItem(null);
};

const DialogUI = ({
  open,
  setOpen,
  selectedItem,
  action,
  setSelectedItem,
}: {
  selectedItem: User | null;
  action: string | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<User | null>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <AlertDialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
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
          <AlertDialogAction
            onClick={() => handleAction(action, setSelectedItem)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const DialogContent = ({
  item,
  action,
}: {
  item: User | null;
  action: string | null;
}) => {
  const form = useForm({
    defaultValues: {
      id: item?.id,
      name: item?.name,
      email: item?.email,
    },
  });

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
    case "create":
      return (
        <div>
          <form>
            <div className="mb-4">
              <Label htmlFor="name" className="block text-gray-700">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                {...form.register("name")}
                className="my-1"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="email" className="block text-gray-700">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                {...form.register("email")}
                className="my-1"
              />
            </div>
          </form>
          <Button
            onClick={async () => {
              // @ts-expect-error
              await createUser(form.getValues());
            }}
          >
            Add User
          </Button>
        </div>
      );
    case "delete":
      return (
        <div>
          Are you sure you want to delete this user?
          <div className="text-red-500">
            <strong>Note:</strong> This action cannot be undone.
          </div>
          <div className="mt-4">
            <strong>User ID:</strong> {item.id}
          </div>
          <div className="mt-2">
            <strong>User Name:</strong> {item.name}{" "}
          </div>
        </div>
      );

    default:
      return null;
  }
};
