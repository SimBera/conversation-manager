import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        username: 'String9793597',
        hashedPassword: 'String',
        salt: 'String',
        role: 'String',
      },
    },
    two: {
      data: {
        username: 'String1335741',
        hashedPassword: 'String',
        salt: 'String',
        role: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard
