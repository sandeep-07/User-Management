import React from "react";
import { Button } from "./ui/button";

interface CreateUserProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAction: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CreateUser: React.FC<CreateUserProps> = ({
  setOpen,
  setAction,
}) => {
  return (
    <Button
      onClick={() => {
        setOpen(true);
        setAction("create");
      }}
      className="mb-4"
    >
      Add User
    </Button>
  );
};
