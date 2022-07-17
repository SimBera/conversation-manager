import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserConversationCreateArgs>({
  userConversation: {
    one: {
      data: {
        user: {
          create: {
            username: 'String613046',
            hashedPassword: 'String',
            salt: 'String',
            role: 'String',
          },
        },
        conversation: { create: { title: 'String' } },
      },
    },
    two: {
      data: {
        user: {
          create: {
            username: 'String9686468',
            hashedPassword: 'String',
            salt: 'String',
            role: 'String',
          },
        },
        conversation: { create: { title: 'String' } },
      },
    },
  },
})

export type StandardScenario = typeof standard
