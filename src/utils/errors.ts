import { isAxiosError } from "axios";

export function extractErrorMessage(err: unknown, fallback: string): string {
  if (isAxiosError(err)) {
    return err.response?.data?.message || fallback;
  }
  if (err instanceof Error) return err.message;
  return fallback;
}
