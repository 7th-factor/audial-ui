"use client";

/**
 * Calls Hooks
 *
 * TanStack Query hooks for the Calls resource.
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { callsService } from "../services/calls";
import type { CreateCallInput, CreateWebSocketRoomInput } from "../types";

const CALLS_KEY = ["calls"] as const;

/**
 * Fetch all calls
 */
export function useCalls() {
  return useQuery({
    queryKey: CALLS_KEY,
    queryFn: callsService.list,
  });
}

/**
 * Fetch a single call by ID (includes full details like messages)
 */
export function useCall(id: string | undefined) {
  return useQuery({
    queryKey: [...CALLS_KEY, id],
    queryFn: () => callsService.get(id!),
    enabled: !!id,
  });
}

/**
 * Create a new outbound call
 */
export function useCreateCall() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCallInput) => callsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CALLS_KEY });
    },
  });
}

/**
 * Create a new outbound call using an existing agent ID
 */
export function useCreateCallByAgentId() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      customer: CreateCallInput["customer"];
      agentId: string;
      phoneNumberId?: string;
      phoneNumber?: CreateCallInput["phoneNumber"];
    }) => callsService.createByAgentId(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CALLS_KEY });
    },
  });
}

const WEBSOCKET_ROOMS_KEY = ["websocket-rooms"] as const;

/**
 * Fetch a WebSocket room by ID
 */
export function useWebSocketRoom(roomId: string | undefined, publicKey: string) {
  return useQuery({
    queryKey: [...WEBSOCKET_ROOMS_KEY, roomId],
    queryFn: () => callsService.getWebSocketRoom(roomId!, publicKey),
    enabled: !!roomId && !!publicKey,
  });
}

/**
 * Create a WebSocket room
 */
export function useCreateWebSocketRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      publicKey,
    }: {
      data: CreateWebSocketRoomInput;
      publicKey: string;
    }) => callsService.createWebSocketRoom(data, publicKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WEBSOCKET_ROOMS_KEY });
      queryClient.invalidateQueries({ queryKey: CALLS_KEY });
    },
  });
}
