import { apiFetch } from '@/lib/api/api-fetch'
import { ApiError } from '@/lib/api/errors'
import {
  type WidgetConfigPayload,
  type WidgetConfig,
  widgetConfigSchema,
} from './types'

const PREFIX = '/api/deployment/widget'

// POST /api/deployment/widget
export async function createWidgetConfig(payload: WidgetConfigPayload): Promise<WidgetConfig> {
  const res = await apiFetch(PREFIX, {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  try {
    return widgetConfigSchema.parse(res)
  } catch (error) {
    console.error('Error parsing widget config with object:', res, '\nerror:', error)
    throw new ApiError(400, { message: 'Invalid widget config' })
  }
}

// GET /api/deployment/widget/{widget_config_id}
export async function getWidgetConfig(widgetConfigId: string): Promise<WidgetConfig> {
  const res = await apiFetch(`${PREFIX}/${widgetConfigId}`)

  try {
    return widgetConfigSchema.parse(res)
  } catch (error) {
    console.error('Error parsing widget config with object:', res, '\nerror:', error)
    throw new ApiError(400, { message: 'Invalid widget config' })
  }
}

// GET /api/deployment/widget/by-agent?agent_id={agent_id}
export async function getWidgetConfigByAgent(agentId: string): Promise<WidgetConfig> {
  const res = await apiFetch(`${PREFIX}/by-agent?agent_id=${agentId}`)

  try {
    return widgetConfigSchema.parse(res)
  } catch (error) {
    console.error('Error parsing widget config with object:', res, '\nerror:', error)
    throw new ApiError(400, { message: 'Invalid widget config' })
  }
}

// PUT /api/deployment/widget/{widget_config_id}
export async function updateWidgetConfig(
  widgetConfigId: string,
  payload: WidgetConfigPayload
): Promise<WidgetConfig> {
  const res = await apiFetch(`${PREFIX}/${widgetConfigId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

  try {
    return widgetConfigSchema.parse(res)
  } catch (error) {
    console.error('Error parsing widget config with object:', res, '\nerror:', error)
    throw new ApiError(400, { message: 'Invalid widget config' })
  }
}
