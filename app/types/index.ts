export type User = {
  id: number;
  name: string;
  role: "Admin" | "User";
  status: "Active" | "Inactive";
  email: string;
};

export type Users = User[];
