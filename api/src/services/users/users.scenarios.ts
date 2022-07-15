import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        username: 'String3318271',
        hashedPassword: 'String',
        salt: 'String',
        role: 'String',
      },
    },
    two: {
      data: {
        username: 'String1913494',
        hashedPassword: 'String',
        salt: 'String',
        role: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard
