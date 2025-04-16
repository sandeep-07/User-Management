import { ColumnDef, Row } from "@tanstack/react-table";
import { User } from "../types";
import { ArrowDown, ArrowUp, Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const getColumns = ({
  config,
  setConfig,
  handleActionClick,
}: {
  config: { sort: string[] };
  setConfig: React.Dispatch<
    React.SetStateAction<{
      sort: string[];
    }>
  >;
  handleActionClick: (action: "view" | "edit" | "delete", row: User) => void;
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
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }: { row: Row<User> }) => {
        return (
          <div className="flex items-center gap-2">
            <Button
              className="cursor-pointer"
              variant="ghost"
              size="icon"
              onClick={() => handleActionClick("view", row.original)}
              title="View"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              className="cursor-pointer"
              variant="ghost"
              size="icon"
              onClick={() => handleActionClick("edit", row.original)}
              title="Edit"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleActionClick("delete", row.original)}
              title="Delete"
              className="text-red-500 cursor-pointer hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return columnns;
};
