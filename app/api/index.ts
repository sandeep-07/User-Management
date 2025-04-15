import axios from "axios";
import { Users } from "../types";

export const getUsers = () => {
  return axios.get<Users>(`${process.env.NEXT_PUBLIC_API_URL}/users`);
};
