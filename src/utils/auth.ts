export const TOKEN_KEY = "plotfarm_token";
export const USER_KEY = "plotfarm_user";
export const REMEMBER_KEY = "plotfarm_remember";

export interface StoredUser {
  userId: string;
  username: string;
  fullName?: string;
  email?: string;
  roles: string[];
}

function activeStorage(): Storage {
  return localStorage.getItem(REMEMBER_KEY) === "0" ? sessionStorage : localStorage;
}

export const saveToken = (token: string, remember = true) => {
  localStorage.setItem(REMEMBER_KEY, remember ? "1" : "0");
  activeStorage().setItem(TOKEN_KEY, token);
};

export const getToken = () => activeStorage().getItem(TOKEN_KEY);

export const saveUser = (user: StoredUser) =>
  activeStorage().setItem(USER_KEY, JSON.stringify(user));

export const getUser = (): StoredUser | null => {
  const raw = activeStorage().getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
  localStorage.removeItem(REMEMBER_KEY);
};
