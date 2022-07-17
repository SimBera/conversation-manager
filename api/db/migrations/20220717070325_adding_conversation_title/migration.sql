/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserConversation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[conversationId]` on the table `UserConversation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_id_key";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Conversation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL
);
INSERT INTO "new_Conversation" ("id") SELECT "id" FROM "Conversation";
DROP TABLE "Conversation";
ALTER TABLE "new_Conversation" RENAME TO "Conversation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "UserConversation_userId_key" ON "UserConversation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserConversation_conversationId_key" ON "UserConversation"("conversationId");
