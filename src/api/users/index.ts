import { User } from "@prisma/client";
import api, { fetcher } from "api";
import useSWR from "swr";
import { GetWithPagination, GetWithPaginationResponse } from "types";

const getParams = ({ skip, take }: GetWithPagination) => {
  const paramsObj = {
    skip: skip.toString(),
    take: take.toString(),
  };

  return new URLSearchParams(paramsObj);
};

export const useUsers = ({ skip, take }: GetWithPagination) => {
  const params = getParams({ skip, take });

  const { data, error, mutate } = useSWR(`/users?${params.toString()}`, fetcher);

  return {
    usersData: data,
    mutateUsers: mutate,
    isLoading: !error && !data,
    isError: error,
  };
};

export const getUsers = ({ skip, take }: GetWithPagination): Promise<GetWithPaginationResponse<User[]>> => {
  const params = getParams({ skip, take });
  return api.get(`/users?${params.toString()}`);
};
