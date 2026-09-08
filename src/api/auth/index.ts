import realAuthApi from "./authApi";
import mockAuthApi from "./mockAuthApi";
import type { AuthApi } from "./types";

const useMock =
  import.meta.env.VITE_USE_MOCK_AUTH === "true" || !import.meta.env.VITE_API_URL;

// Google login always hits the real backend (it needs actual Google token verification);
// every other auth endpoint stays mock until the rest of the BE is ready.
const authApi: AuthApi = {
  ...(useMock ? mockAuthApi : realAuthApi),
  googleLogin: realAuthApi.googleLogin,
};

export default authApi;
export * from "./types";
