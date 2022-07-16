import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ConversationCreateArgs>({
  conversation: {
    one: { data: { userId: 3774437 } },
    two: { data: { userId: 9581814 } },
  },
})

export type StandardScenario = typeof standard
