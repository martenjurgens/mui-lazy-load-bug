import { User } from "@prisma/client";
import userRepository from "repository/userRepository";
import { GetWithPagination, GetWithPaginationResponse } from "types";

const getUsers = async ({ skip, take }: GetWithPagination): Promise<GetWithPaginationResponse<User[]>> => {
  const [count, users] = await userRepository.getUsers({
    skip,
    take,
  });

  return { count, rows: users };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUsers,
};
