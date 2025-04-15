"use client";
import { DataTable } from "@/components/ui/DataTable";
import { useEffect, useState } from "react";
import { getUsers } from "./api";
import { Users } from "./types";
import { columnns } from "./constants";

export default function Home() {
  const [users, setUsers] = useState<Users>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();

        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold ">User Management</h1>
      <DataTable columns={columnns} data={users} />
    </div>
  );
}
