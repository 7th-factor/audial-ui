import { z } from 'zod'

export enum SupportedLanguageCode {
  ENGLISH = 'en',
  SPANISH = 'es',
  CHILEAN_SPANISH = 'es-CL',
  PORTUGUESE = 'pt',
  PORTUGUESE_BRASIL = 'pt-BR',
}

export enum LLMProvider {
  OPENAI = 'openai',
}

export enum VoiceProvider {
  ELEVENLABS = 'elevenlabs',
}

export enum STTProvider {
  DEEPGRAM = 'deepgram',
}

export const llmConfigSchema = z.object({
  provider: z.nativeEnum(LLMProvider).default(LLMProvider.OPENAI),
  model: z.string(),
  storeCompletions: z.boolean().default(true),
  temperature: z.number().min(0).max(1).default(0.1),
  toolIds: z.array(z.string()).default([]),
})

export const voiceConfigSchema = z.object({
  provider: z.nativeEnum(VoiceProvider).default(VoiceProvider.ELEVENLABS),
  voiceId: z.string(),
  apiKey: z.string().optional(),
  stability: z.number().min(0).max(1).default(0.5),
  similarityBoost: z.number().min(0).max(1).default(0.8),
  speed: z.number().min(0).max(100).optional(),
})

export const sttConfigSchema = z.object({
  provider: z.nativeEnum(STTProvider).default(STTProvider.DEEPGRAM),
  apiKey: z.string().optional(),
  model: z.string().optional(),
})

export const voiceAgentSchema = z.object({
  id: z.string().uuid().nullable(),
  name: z.string(),
  languageCode: z.nativeEnum(SupportedLanguageCode),
  prompt: z.string(),
  model: llmConfigSchema,
  voice: voiceConfigSchema,
  transcriber: sttConfigSchema.default({}),
  maxDurationSeconds: z.number().gt(0).max(3600).default(1800),
  sendInitialMessage: z.boolean().default(true),
  allowInterruptions: z.boolean().default(true),
})

export type VoiceAgent = z.infer<typeof voiceAgentSchema>
export type LLMConfig = z.infer<typeof llmConfigSchema>
export type VoiceConfig = z.infer<typeof voiceConfigSchema>
export type STTConfig = z.infer<typeof sttConfigSchema>
