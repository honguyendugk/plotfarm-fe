import type { InternalAxiosRequestConfig } from "axios";
import { getToken } from "../utils/auth";

const PUBLIC_ANY_METHOD_PREFIXES = ["/auth/"];

export function shouldSkipAuth(config: InternalAxiosRequestConfig): boolean {
  const url = String(config?.url || "");
  return PUBLIC_ANY_METHOD_PREFIXES.some((prefix) => url.startsWith(prefix));
}

export function applySharedRequestPolicy(
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig {
  const token = getToken();
  if (!config.headers) config.headers = {} as never;

  if (shouldSkipAuth(config)) {
    delete config.headers.Authorization;
  } else if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}
