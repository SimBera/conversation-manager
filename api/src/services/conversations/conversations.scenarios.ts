import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ConversationCreateArgs>({
  conversation: { one: { data: {} }, two: { data: {} } },
})

export type StandardScenario = typeof standard
