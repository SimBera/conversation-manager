import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserConversationCreateArgs>({
  userConversation: {
    one: {
      data: {
        user: {
          create: {
            username: 'String8007955',
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
        user: {
          create: {
            username: 'String5920458',
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
