import { Prisma, User } from "@prisma/client";
import { GetWithPagination } from "types";
import { prisma } from "utils/postgreClient";

const getUsers = ({ skip, take }: GetWithPagination): Promise<[number, User[]]> =>
  prisma.$transaction([countUsers(), findUsers({ skip, take })]);

const findUsers = ({ skip, take }: GetWithPagination): Prisma.PrismaPromise<User[]> =>
  prisma.user.findMany({
    skip,
    take,
  });

const countUsers = (): Prisma.PrismaPromise<number> => prisma.user.count();

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUsers,
};
