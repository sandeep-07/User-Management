"use client";
import { useState } from "react";
import { getUsers } from "./api";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/DataTable";
import { getColumns } from "./utils";

export default function Home() {
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
  });
  const [config, setConfig] = useState<{
    sort: string[];
  }>({ sort: [] });

  console.log("config", config);
  const columnns = getColumns({ config, setConfig });

  const { data, isLoading } = useQuery({
    queryKey: ["users", pagination.pageIndex, pagination.pageSize, config.sort],
    queryFn: () =>
      getUsers({
        page: pagination.pageIndex,
        size: pagination.pageSize,
        sort: config.sort,
      }),
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
