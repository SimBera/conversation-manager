import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    const users = [
      {
        username: 'tadas',
        salt: '9aba2a6ce668abd1207f9d43cf4e93c5',
        role: 'regular',
        hashedPassword:
          '4913e9e2580c024103aa313c8d7ddd15dc24d775a2052f82fee51730a7049b8d',
      },
      {
        username: 'jonas',
        salt: '9aba2a6ce668abd1207f9d43cf4e93c5',
        role: 'admin',
        hashedPassword:
          'ec38a1596ef8673b759240a8836aaf51aec5abfbb4e5f60740d91fa61ca6b9c5',
      },
    ]


    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //
    // Update "const data = []" to match your data model and seeding needs
    //
    const data: Prisma.UserExampleCreateArgs['data'][] = [
      // To try this example data with the UserExample model in schema.prisma,
      // uncomment the lines below and run 'yarn rw prisma migrate dev'
      //
      // { name: 'alice', email: 'alice@example.com' },
      // { name: 'mark', email: 'mark@example.com' },
      // { name: 'jackie', email: 'jackie@example.com' },
      // { name: 'bob', email: 'bob@example.com' },
    ]
    console.log(
      "\nUsing the default './scripts/seed.{js,ts}' template\nEdit the file to add seed data\n"
    )

    // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
    Promise.all(
      users.map(async (data: Prisma.UserCreateArgs['data']) => {
        const record = await db.user.create({
          data
        })
        console.log(record)
      })
      //
      // Change to match your data model and seeding needs
      //
      data.map(async (data: Prisma.UserExampleCreateArgs['data']) => {
        const record = await db.userExample.create({ data })
        console.log(record)
      })
    )
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
