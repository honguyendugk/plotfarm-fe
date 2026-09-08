interface ApiEnvelope<T> {
  success?: boolean;
  message?: string;
  data?: T;
}

export function unwrapApiData<T>(payload: ApiEnvelope<T> | T, fallback: T): T {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as ApiEnvelope<T>).data ?? fallback;
  }
  return (payload as T) ?? fallback;
}
