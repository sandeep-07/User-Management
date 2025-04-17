import React from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "../ui/alert-dialog";
import { DialogContent } from "./DialogContent";
import { User } from "@/app/types";

interface DialogUIProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: User | null;
  action: string | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<User | null>>;
  onSubmit: (
    action: string | null,
    formData?: { name: string; email: string }
  ) => void;
  isLoading: boolean;
}

export const DialogUI: React.FC<DialogUIProps> = ({
  open,
  setOpen,
  selectedItem,
  action,
  onSubmit,
  isLoading,
}) => {
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {action === "create"
              ? "Create User"
              : action === "edit"
              ? "Edit User"
              : action === "delete"
              ? "Delete User"
              : "View User"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <DialogContent
              item={selectedItem}
              action={action}
              onSubmit={onSubmit}
              isLoading={isLoading}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        {action === "view" && (
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleOpenChange(false)}>
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};
