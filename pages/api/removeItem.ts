import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const toDoListData = JSON.parse(req.body);
  try {
    const toDoItem = await prisma.toDo.update({
      where: { id: toDoListData.id },
      data: { isDone: toDoListData.isDone },
    });
    res.json({ message: 'successfully created', code: 200 });
  } catch (e) {
    res.json({ message: 'error', code: 500 });
  }
};
