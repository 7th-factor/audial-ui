import { api } from '@/lib/api/api-fetch'
import type { VoiceAgent } from './types'

const PREFIX = '/api/v1/agents'

export const agentsFetchers = {
  list: async (): Promise<VoiceAgent[]> => {
    return api.get<VoiceAgent[]>(PREFIX)
  },

  get: async (id: string): Promise<VoiceAgent> => {
    return api.get<VoiceAgent>(`${PREFIX}/${id}`)
  },
}
