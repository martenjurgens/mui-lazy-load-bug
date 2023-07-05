import { PrismaClient as PostgreClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var postgreClient: PostgreClient;
}

// eslint-disable-next-line import/prefer-default-export
export const prisma =
  global.postgreClient ||
  new PostgreClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
    ],
    errorFormat: "pretty",
  });

if (process.env.NODE_ENV !== "production") {
  global.postgreClient = prisma;
}
