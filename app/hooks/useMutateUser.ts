import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, updateUser, deleteUser } from "../api";
import { User } from "../types";

export const useMutateUser = ({
  page,
  limit,
  sort,
}: {
  page: number;
  limit: number;
  sort: string[];
}) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (user: Omit<User, "id">) => createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", page, limit, sort] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (user: User) => updateUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", page, limit, sort] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", page, limit, sort] });
    },
  });

  return {
    createUser: createMutation.mutate,
    updateUser: updateMutation.mutate,
    deleteUser: deleteMutation.mutate,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};
