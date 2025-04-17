import React from "react";
import { useForm } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AlertDialogCancel, AlertDialogAction } from "../ui/alert-dialog";
import { User } from "@/app/types";

interface DialogContentProps {
  item: User | null;
  action: string | null;
  onSubmit: (
    action: string | null,
    formData?: { name: string; email: string }
  ) => void;
  isLoading: boolean;
}

export const DialogContent: React.FC<DialogContentProps> = ({
  item,
  action,
  onSubmit,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: item?.name || "",
      email: item?.email || "",
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
              <TableCell>{item?.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Name</TableCell>
              <TableCell>{item?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Email</TableCell>
              <TableCell>{item?.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
    case "edit":
    case "create":
      return (
        <form onSubmit={handleSubmit((data) => onSubmit(action, data))}>
          <div className="mb-4">
            <Label htmlFor="name" className="block text-gray-700">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className="my-1"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="email" className="block text-gray-700">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="my-1"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel onClick={() => onSubmit(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction type="submit" disabled={isLoading}>
              {isLoading
                ? "Processing..."
                : action === "create"
                ? "Create"
                : "Save"}
            </AlertDialogAction>
          </div>
        </form>
      );
    case "delete":
      return (
        <div>
          <div>
            Are you sure you want to delete this user?
            <div className="text-red-500">
              <strong>Note:</strong> This action cannot be undone.
            </div>
            <div className="mt-4">
              <strong>User ID:</strong> {item?.id}
            </div>
            <div className="mt-2">
              <strong>User Name:</strong> {item?.name}
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <AlertDialogCancel onClick={() => onSubmit(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onSubmit(action)}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </div>
      );
    default:
      return null;
  }
};
