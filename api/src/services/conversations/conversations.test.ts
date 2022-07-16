import {
  conversations,
  conversation,
  createConversation,
  updateConversation,
  deleteConversation,
} from './conversations'
import type { StandardScenario } from './conversations.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('conversations', () => {
  scenario('returns all conversations', async (scenario: StandardScenario) => {
    const result = await conversations()

    expect(result.length).toEqual(Object.keys(scenario.conversation).length)
  })

  scenario(
    'returns a single conversation',
    async (scenario: StandardScenario) => {
      const result = await conversation({ id: scenario.conversation.one.id })

      expect(result).toEqual(scenario.conversation.one)
    }
  )

  scenario('creates a conversation', async () => {
    const result = await createConversation({
      input: { userId: 1190981 },
    })

    expect(result.userId).toEqual(1190981)
  })

  scenario('updates a conversation', async (scenario: StandardScenario) => {
    const original = await conversation({ id: scenario.conversation.one.id })
    const result = await updateConversation({
      id: original.id,
      input: { userId: 7898590 },
    })

    expect(result.userId).toEqual(7898590)
  })

  scenario('deletes a conversation', async (scenario: StandardScenario) => {
    const original = await deleteConversation({
      id: scenario.conversation.one.id,
    })
    const result = await conversation({ id: original.id })

    expect(result).toEqual(null)
  })
})
