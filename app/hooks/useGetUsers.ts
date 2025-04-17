import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api";

export const useGetUsers = ({
  page,
  limit,
  sort,
  query,
}: {
  page: number;
  limit: number;
  sort: string[];
  query: string;
}) => {
  return useQuery({
    queryKey: ["users", page, limit, sort, query],
    queryFn: () =>
      getUsers({
        page: page,
        size: limit,
        sort: sort,
        query,
      }),
  });
};
