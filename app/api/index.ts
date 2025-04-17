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

// export const createUser = (data: Omit<User, "id">) => {
//   return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, data);
// };

const API_URL = "http://localhost:3001";

// export const getUsers = async (params: {
//   page: number;
//   limit: number;
//   sort?: string[];
// }) => {
//   const { page, limit, sort } = params;
//   const sortQuery = sort?.length ? `&_sort=${sort.join(",")}` : "";
//   const response = await axios.get(
//     `${API_URL}/users?_page=${page}&_limit=${limit}${sortQuery}`
//   );
//   return {
//     data: response.data,
//     headers: response.headers,
//   };
// };

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
