import { ColumnDef } from "@tanstack/react-table";
import { User } from "../types";
import { ArrowDown, ArrowUp } from "lucide-react";

export const getColumns = ({
  config,
  setConfig,
}: {
  config: { sort: string[] };
  setConfig: React.Dispatch<
    React.SetStateAction<{
      sort: string[];
    }>
  >;
}) => {
  const toggleSorting = (columnKey: string) => {
    // Find if the column is already in sort array
    const index = config.sort.findIndex((item) => item.startsWith(columnKey));

    if (index !== -1) {
      // If column found in sort array, toggle sorting order
      const currentOrder = config.sort[index].split(",")[1];
      const newOrder = currentOrder === "asc" ? "desc" : "asc";
      const newSort = [`${columnKey},${newOrder}`];

      // Update sort array
      setConfig({ sort: newSort });
    } else {
      // If column not found in sort array, add it with default asc order
      const newSort = [...config.sort, `${columnKey},asc`];

      // Update sort array
      setConfig({ sort: newSort });
    }
  };

  const columnns: ColumnDef<User>[] = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            // variant="ghost"
            onClick={() => {
              toggleSorting("email");
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
          >
            Email
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4 " />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )}
          </div>
        );
      },
    },
  ];

  return columnns;
};
