import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ChatRecordCreateArgs>({
  chatRecord: {
    one: {
      data: {
        sourceId: 372554,
        targetId: 2863319,
        message: 'String',
        conversationId: 6511959,
      },
    },
    two: {
      data: {
        sourceId: 5018842,
        targetId: 8738456,
        message: 'String',
        conversationId: 2359347,
      },
    },
  },
})

export type StandardScenario = typeof standard
