import axios from "axios";
import { User } from "../types";

export const getUsers = ({
  page = 1,
  size = 10,
  sort = [],
}: {
  page?: number;
  size?: number;
  sort?: string[];
}) => {
  console.log(
    sort.map((item) => {
      const order = item.split(",")[1];
      return order === "asc" ? order : `-${item.split(",")[0]}`;
    })
  );
  return axios.get<User[]>(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    params: {
      ["_page"]: page,
      ["_limit"]: size,
      ["_sort"]: sort
        .map((item) => {
          const order = item.split(",")[1];
          return order === "asc"
            ? `${item.split(",")[0]}`
            : `-${item.split(",")[0]}`;
        })
        .join(","),
    },
  });
};
