import axios from "axios";
import { User } from "../types";

export const getUsers = ({
  page = 1,
  size = 10,
  sort = [],
  query,
}: {
  page?: number;
  size?: number;
  sort?: string[];
  query: string;
}) => {
  return axios.get<User[]>(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    params: {
      ["_page"]: page,
      ["_limit"]: size,
      ["name_like"]: query,
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

const API_URL = "http://localhost:3001";

export const createUser = async (user: Omit<User, "id">) => {
  const response = await axios.post(`${API_URL}/users`, user);
  return response.data;
};

export const updateUser = async (user: User) => {
  console.log("Came in updateUser");
  const response = await axios.put(`${API_URL}/users/${user.id}`, user);
  return response.data;
};

export const deleteUser = async (id: number) => {
  await axios.delete(`${API_URL}/users/${id}`);
};
