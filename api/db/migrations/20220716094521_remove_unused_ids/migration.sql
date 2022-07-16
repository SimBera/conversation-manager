/*
  Warnings:

  - You are about to drop the column `id` on the `ConversationChatRecord` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `UserConversation` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ConversationChatRecord" (
    "conversationId" INTEGER NOT NULL,
    "chatRecordId" INTEGER NOT NULL,

    PRIMARY KEY ("chatRecordId", "conversationId"),
    CONSTRAINT "ConversationChatRecord_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ConversationChatRecord_chatRecordId_fkey" FOREIGN KEY ("chatRecordId") REFERENCES "ChatRecord" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ConversationChatRecord" ("chatRecordId", "conversationId") SELECT "chatRecordId", "conversationId" FROM "ConversationChatRecord";
DROP TABLE "ConversationChatRecord";
ALTER TABLE "new_ConversationChatRecord" RENAME TO "ConversationChatRecord";
CREATE TABLE "new_UserConversation" (
    "userId" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "conversationId"),
    CONSTRAINT "UserConversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserConversation_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserConversation" ("conversationId", "userId") SELECT "conversationId", "userId" FROM "UserConversation";
DROP TABLE "UserConversation";
ALTER TABLE "new_UserConversation" RENAME TO "UserConversation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
