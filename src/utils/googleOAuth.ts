const GOOGLE_OAUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
const STATE_KEY = "plotfarm_google_oauth_state";
const RETURN_TO_KEY = "plotfarm_google_oauth_return_to";

export const GOOGLE_CALLBACK_PATH = "/auth/google/callback";

function randomToken() {
  return crypto.randomUUID().replace(/-/g, "");
}

/** Builds the full-page redirect URL to Google's sign-in page. Returns null if no client ID is configured. */
export function buildGoogleLoginUrl(returnTo: string): string | null {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId) return null;

  const state = randomToken();
  sessionStorage.setItem(STATE_KEY, state);
  sessionStorage.setItem(RETURN_TO_KEY, returnTo);

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${window.location.origin}${GOOGLE_CALLBACK_PATH}`,
    response_type: "id_token",
    scope: "openid email profile",
    state,
    nonce: randomToken(),
    prompt: "select_account",
  });

  return `${GOOGLE_OAUTH_ENDPOINT}?${params.toString()}`;
}

export interface GoogleOAuthResult {
  credential?: string;
  returnTo: string;
  error?: string;
}

/** Reads the URL fragment Google redirects back with and validates the CSRF state. */
export function consumeGoogleOAuthCallback(hash: string): GoogleOAuthResult {
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  const expectedState = sessionStorage.getItem(STATE_KEY);
  const returnTo = sessionStorage.getItem(RETURN_TO_KEY) || "/";

  sessionStorage.removeItem(STATE_KEY);
  sessionStorage.removeItem(RETURN_TO_KEY);

  const oauthError = params.get("error");
  if (oauthError) return { returnTo, error: oauthError };

  const idToken = params.get("id_token");
  const state = params.get("state");
  if (!idToken || !state || state !== expectedState) {
    return { returnTo, error: "invalid_state" };
  }

  return { credential: idToken, returnTo };
}
