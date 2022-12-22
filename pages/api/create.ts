import { prisma } from "../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, note } = req.body;

  try {
    await prisma.note.create({
      data: {
        title,
        note,
      },
    });
    res.status(201).json({ message: "Note created" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}
