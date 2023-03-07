-- CreateTable
CREATE TABLE "ToDo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "itemName" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "ToDoList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
