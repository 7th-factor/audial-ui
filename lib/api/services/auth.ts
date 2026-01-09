/**
 * Auth Service
 *
 * API service functions for authentication-related endpoints.
 */

import { apiClient } from "../client";

export interface ExchangeTokenInput {
  code: string;
  redirectUri: string;
}

export interface ExchangeTokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  tokenType: string;
}

export const authService = {
  /**
   * Exchange an authorization code for access tokens
   */
  exchangeToken: (data: ExchangeTokenInput) =>
    apiClient.post<ExchangeTokenResponse>("/api/auth/exchange-token", data),
};
