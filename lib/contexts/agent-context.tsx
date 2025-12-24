'use client'

import { createContext, useContext, ReactNode, useMemo, useState, useEffect, useCallback } from 'react'
import { useAgents } from '@/lib/features/agents'
import type { VoiceAgent } from '@/lib/features/agents'

const CURRENT_AGENT_KEY = 'audial_current_agent_id'

interface AgentContextValue {
  agentId: string | null
  agent: VoiceAgent | null
  agents: VoiceAgent[]
  isLoading: boolean
  hasAgent: boolean
  error: Error | null
  switchAgent: (agentId: string) => void
  clearAgent: () => void
  refetchAgents: () => void
}

const AgentContext = createContext<AgentContextValue | undefined>(undefined)

interface AgentProviderProps {
  children: ReactNode
}

export function AgentProvider({ children }: AgentProviderProps) {
  const {
    data: agents,
    isLoading: agentsLoading,
    error,
    refetch: refetchAgents,
  } = useAgents(undefined)

  // Current agent ID from localStorage (persists across sessions)
  const [currentAgentId, setCurrentAgentId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(CURRENT_AGENT_KEY)
  })

  // Validate agent selection when agents load - auto-select first agent if none selected
  useEffect(() => {
    if (agentsLoading) return

    const availableAgents = agents ?? []

    // Check if current agent ID is valid
    const currentIsValid = currentAgentId
      ? availableAgents.some((a) => a.id === currentAgentId)
      : false

    if (currentIsValid) {
      return
    }

    // Auto-select first agent if available
    if (availableAgents.length > 0) {
      const firstAgent = availableAgents[0]
      if (firstAgent.id) {
        setCurrentAgentId(firstAgent.id)
        localStorage.setItem(CURRENT_AGENT_KEY, firstAgent.id)
      }
    } else if (currentAgentId) {
      // No agents available and we had a stale selection - clear it
      setCurrentAgentId(null)
      localStorage.removeItem(CURRENT_AGENT_KEY)
    }
  }, [agents, agentsLoading, currentAgentId])

  // Derive current agent from agents list
  const currentAgent = useMemo((): VoiceAgent | null => {
    if (!agents?.length || !currentAgentId) return null
    return agents.find((a) => a.id === currentAgentId) ?? null
  }, [agents, currentAgentId])

  // Switch agent handler
  const switchAgent = useCallback((agentId: string) => {
    setCurrentAgentId(agentId)
    localStorage.setItem(CURRENT_AGENT_KEY, agentId)
  }, [])

  // Clear agent selection
  const clearAgent = useCallback(() => {
    setCurrentAgentId(null)
    localStorage.removeItem(CURRENT_AGENT_KEY)
  }, [])

  const value = useMemo(
    () => ({
      agentId: currentAgent?.id ?? null,
      agent: currentAgent,
      agents: agents ?? [],
      isLoading: agentsLoading,
      hasAgent: !!currentAgent,
      error: error as Error | null,
      switchAgent,
      clearAgent,
      refetchAgents,
    }),
    [currentAgent, agents, agentsLoading, error, switchAgent, clearAgent, refetchAgents]
  )

  return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>
}

/**
 * Hook to get the current agent ID.
 * Throws an error if used outside of AgentProvider.
 */
export function useAgentId(): string | null {
  const context = useContext(AgentContext)
  if (context === undefined) {
    throw new Error('useAgentId must be used within an AgentProvider')
  }
  return context.agentId
}

/**
 * Hook to get the full agent context.
 * Throws an error if used outside of AgentProvider.
 */
export function useAgent(): AgentContextValue {
  const context = useContext(AgentContext)
  if (context === undefined) {
    throw new Error('useAgent must be used within an AgentProvider')
  }
  return context
}

/**
 * Safe version that returns null if outside provider.
 */
export function useSafeAgentId(): string | null {
  const context = useContext(AgentContext)
  return context?.agentId ?? null
}
