import { NextApiRequest, NextApiResponse } from "next";
import userService from "service/userService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Process the GET request

    const { skip, take } = req.query;

    const allUsers = await userService.getUsers({
      skip: Number(skip),
      take: Number(take),
    });

    res.status(200).json(allUsers);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
