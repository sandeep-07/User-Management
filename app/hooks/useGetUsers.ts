import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api";

export const useGetUsers = ({
  page,
  limit,
  sort,
}: {
  page: number;
  limit: number;
  sort: string[];
}) => {
  return useQuery({
    queryKey: ["users", page, limit, sort],
    queryFn: () =>
      getUsers({
        page: page,
        size: limit,
        sort: sort,
      }),
  });
};
