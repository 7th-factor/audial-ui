import { z } from 'zod'

export const modalitySchema = z.enum(['chat', 'voice', 'both'])
export type Modality = z.infer<typeof modalitySchema>

export const positionSchema = z.enum(['right', 'left'])
export type Position = z.infer<typeof positionSchema>

// HEX_COLOR: string that must match the HEX pattern (#RGB or #RRGGBB)
export const hexColorSchema = z.string().regex(/^#(?:[0-9A-Fa-f]{3}){1,2}$/, {
  message: 'Invalid HEX color format',
})
export type HexColor = z.infer<typeof hexColorSchema>

// URL: we use string, but it must be a valid URL
export const httpUrlSchema = z.string().url()
export type HttpUrl = z.infer<typeof httpUrlSchema>

export const launcherConfigSchema = z.object({
  modality: modalitySchema,
  position: positionSchema,
  sideSpacing: z
    .number({ invalid_type_error: 'A valid side spacing is required' })
    .min(0)
    .max(1000),
  bottomSpacing: z
    .number({ invalid_type_error: 'A valid bottom spacing is required' })
    .min(0)
    .max(1000),
  voiceInputEnabled: z.boolean(),
  voiceOutputEnabled: z.boolean(),
  ttsVoice: z.string().nullable().optional(), // optional, only if voiceOutputEnabled
})
export type LauncherConfig = z.infer<typeof launcherConfigSchema>

export const styleConfigSchema = z.object({
  primaryColor: hexColorSchema,
  backgroundColor: hexColorSchema,
  logoUrl: httpUrlSchema.nullable().optional(),
  agentAvatar: httpUrlSchema.nullable().optional(),
  backgroundUrl: httpUrlSchema.nullable().optional(),
})
export type StyleConfig = z.infer<typeof styleConfigSchema>

export const bannerConfigSchema = z.object({
  header: z.string().max(60), // max_length: 60 (characters)
  description: z.string().max(140), // max_length: 140 (characters)
  imageUrl: httpUrlSchema.nullable().optional(),
})
export type BannerConfig = z.infer<typeof bannerConfigSchema>

// WidgetConfigPayload: for creating/updating, without id or timestamps
export const widgetConfigPayloadSchema = z.object({
  launcher: launcherConfigSchema,
  style: styleConfigSchema,
  banner: bannerConfigSchema,
})
export type WidgetConfigPayload = z.infer<typeof widgetConfigPayloadSchema>

// WidgetConfig: complete document, inherits from payload and adds id and timestamps
export const widgetConfigSchema = widgetConfigPayloadSchema.extend({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})
export type WidgetConfig = z.infer<typeof widgetConfigSchema>
