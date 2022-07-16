import {
  chatRecords,
  chatRecord,
  createChatRecord,
  updateChatRecord,
  deleteChatRecord,
} from './chatRecords'
import type { StandardScenario } from './chatRecords.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('chatRecords', () => {
  scenario('returns all chatRecords', async (scenario: StandardScenario) => {
    const result = await chatRecords()

    expect(result.length).toEqual(Object.keys(scenario.chatRecord).length)
  })

  scenario(
    'returns a single chatRecord',
    async (scenario: StandardScenario) => {
      const result = await chatRecord({ id: scenario.chatRecord.one.id })

      expect(result).toEqual(scenario.chatRecord.one)
    }
  )

  scenario('creates a chatRecord', async () => {
    const result = await createChatRecord({
      input: {
        sourceId: 3348687,
        targetId: 7107113,
        message: 'String',
        conversationId: 1359025,
      },
    })

    expect(result.sourceId).toEqual(3348687)
    expect(result.targetId).toEqual(7107113)
    expect(result.message).toEqual('String')
    expect(result.conversationId).toEqual(1359025)
  })

  scenario('updates a chatRecord', async (scenario: StandardScenario) => {
    const original = await chatRecord({ id: scenario.chatRecord.one.id })
    const result = await updateChatRecord({
      id: original.id,
      input: { sourceId: 4400789 },
    })

    expect(result.sourceId).toEqual(4400789)
  })

  scenario('deletes a chatRecord', async (scenario: StandardScenario) => {
    const original = await deleteChatRecord({ id: scenario.chatRecord.one.id })
    const result = await chatRecord({ id: original.id })

    expect(result).toEqual(null)
  })
})
