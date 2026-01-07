import { apiClient, ApiError } from '@/lib/api/client'
import {
  type WidgetConfigPayload,
  type WidgetConfig,
  widgetConfigSchema,
} from './types'

const PREFIX = '/api/deployment/widget'

// POST /api/deployment/widget
export async function createWidgetConfig(payload: WidgetConfigPayload): Promise<WidgetConfig> {
  const res = await apiClient.post(PREFIX, payload)

  try {
    return widgetConfigSchema.parse(res)
  } catch (error) {
    console.error('Error parsing widget config with object:', res, '\nerror:', error)
    throw new ApiError(400, 'Bad Request', 'Invalid widget config')
  }
}

// GET /api/deployment/widget/{widget_config_id}
export async function getWidgetConfig(widgetConfigId: string): Promise<WidgetConfig> {
  const res = await apiClient.get(`${PREFIX}/${widgetConfigId}`)

  try {
    return widgetConfigSchema.parse(res)
  } catch (error) {
    console.error('Error parsing widget config with object:', res, '\nerror:', error)
    throw new ApiError(400, 'Bad Request', 'Invalid widget config')
  }
}

// GET /api/deployment/widget/by-agent?agent_id={agent_id}
export async function getWidgetConfigByAgent(agentId: string): Promise<WidgetConfig> {
  const res = await apiClient.get(`${PREFIX}/by-agent?agent_id=${agentId}`)

  try {
    return widgetConfigSchema.parse(res)
  } catch (error) {
    console.error('Error parsing widget config with object:', res, '\nerror:', error)
    throw new ApiError(400, 'Bad Request', 'Invalid widget config')
  }
}

// PUT /api/deployment/widget/{widget_config_id}
export async function updateWidgetConfig(
  widgetConfigId: string,
  payload: WidgetConfigPayload
): Promise<WidgetConfig> {
  const res = await apiClient.put(`${PREFIX}/${widgetConfigId}`, payload)

  try {
    return widgetConfigSchema.parse(res)
  } catch (error) {
    console.error('Error parsing widget config with object:', res, '\nerror:', error)
    throw new ApiError(400, 'Bad Request', 'Invalid widget config')
  }
}
