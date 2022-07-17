import {
  userConversations,
  userConversation,
  createUserConversation,
  updateUserConversation,
  deleteUserConversation,
} from './userConversations'
import type { StandardScenario } from './userConversations.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userConversations', () => {
  scenario(
    'returns all userConversations',
    async (scenario: StandardScenario) => {
      const result = await userConversations()

      expect(result.length).toEqual(
        Object.keys(scenario.userConversation).length
      )
    }
  )

  scenario(
    'returns a single userConversation',
    async (scenario: StandardScenario) => {
      const result = await userConversation({
        id: scenario.userConversation.one.id,
      })

      expect(result).toEqual(scenario.userConversation.one)
    }
  )

  scenario('creates a userConversation', async (scenario: StandardScenario) => {
    const result = await createUserConversation({
      input: {
        userId: scenario.userConversation.two.userId,
        conversationId: scenario.userConversation.two.conversationId,
      },
    })

    expect(result.userId).toEqual(scenario.userConversation.two.userId)
    expect(result.conversationId).toEqual(
      scenario.userConversation.two.conversationId
    )
  })

  scenario('updates a userConversation', async (scenario: StandardScenario) => {
    const original = await userConversation({
      id: scenario.userConversation.one.id,
    })
    const result = await updateUserConversation({
      id: original.id,
      input: { userId: scenario.userConversation.two.userId },
    })

    expect(result.userId).toEqual(scenario.userConversation.two.userId)
  })

  scenario('deletes a userConversation', async (scenario: StandardScenario) => {
    const original = await deleteUserConversation({
      id: scenario.userConversation.one.id,
    })
    const result = await userConversation({ id: original.id })

    expect(result).toEqual(null)
  })
})
