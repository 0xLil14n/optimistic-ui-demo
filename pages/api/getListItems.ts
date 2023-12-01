import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();
const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));
export default async (req: NextApiRequest, res: NextApiResponse) => {
  await wait(2000);
  const list = await prisma.toDoList.findFirst();

  const toDos = await prisma.toDoList
    .findUnique({
      where: { id: list?.id },
    })
    .toDos();

  res.json({ toDos, list });
};
