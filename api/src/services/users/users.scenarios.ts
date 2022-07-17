import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        username: 'String3021477',
        hashedPassword: 'String',
        salt: 'String',
        role: 'String',
      },
    },
    two: {
      data: {
        username: 'String902593',
        hashedPassword: 'String',
        salt: 'String',
        role: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard
