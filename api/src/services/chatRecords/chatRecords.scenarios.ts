import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ChatRecordCreateArgs>({
  chatRecord: {
    one: {
      data: {
        message: 'String',
        createdBy: {
          create: {
            username: 'String5616542',
            hashedPassword: 'String',
            salt: 'String',
            role: 'String',
          },
        },
        conversation: { create: {} },
      },
    },
    two: {
      data: {
        message: 'String',
        createdBy: {
          create: {
            username: 'String3741445',
            hashedPassword: 'String',
            salt: 'String',
            role: 'String',
          },
        },
        conversation: { create: {} },
      },
    },
  },
})

export type StandardScenario = typeof standard
