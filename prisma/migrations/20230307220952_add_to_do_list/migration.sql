/*
  Warnings:

  - Added the required column `listId` to the `ToDo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ToDo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "itemName" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "listId" TEXT NOT NULL,
    CONSTRAINT "ToDo_listId_fkey" FOREIGN KEY ("listId") REFERENCES "ToDoList" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ToDo" ("id", "isDone", "itemName") SELECT "id", "isDone", "itemName" FROM "ToDo";
DROP TABLE "ToDo";
ALTER TABLE "new_ToDo" RENAME TO "ToDo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
