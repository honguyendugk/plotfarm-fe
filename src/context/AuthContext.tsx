import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import authApi from "../api/auth";
import type {
  AuthResponse,
  ForgotPasswordRequest,
  GoogleLoginRequest,
  LoginRequest,
  OtpIssuedResponse,
  RegisterRequest,
  RegisterResponse,
  ResendRegistrationOtpRequest,
  ResetPasswordRequest,
  VerifyRegistrationRequest,
} from "../api/auth";
import {
  getToken,
  getUser,
  logout as clearStoredAuth,
  saveToken,
  saveUser,
  type StoredUser,
} from "../utils/auth";

interface AuthContextValue {
  user: StoredUser | null;
  isAuthenticated: boolean;
  login: (data: LoginRequest, remember?: boolean) => Promise<void>;
  register: (data: RegisterRequest) => Promise<RegisterResponse>;
  loginWithGoogle: (data: GoogleLoginRequest) => Promise<void>;
  verifyRegistrationOtp: (data: VerifyRegistrationRequest) => Promise<void>;
  resendRegistrationOtp: (data: ResendRegistrationOtpRequest) => Promise<OtpIssuedResponse>;
  forgotPassword: (data: ForgotPasswordRequest) => Promise<OtpIssuedResponse>;
  resetPassword: (data: ResetPasswordRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<StoredUser | null>(() => (getToken() ? getUser() : null));

  const persist = useCallback((res: AuthResponse, remember = true) => {
    const storedUser: StoredUser = {
      userId: res.userId,
      username: res.username,
      fullName: res.fullName,
      email: res.email,
      roles: res.roles,
    };
    saveToken(res.token, remember);
    saveUser(storedUser);
    setUser(storedUser);
  }, []);

  const login = useCallback(
    async (data: LoginRequest, remember = true) => {
      const res = await authApi.login(data);
      persist(res, remember);
    },
    [persist],
  );

  const register = useCallback(
    async (data: RegisterRequest) => {
      const res = await authApi.register(data);
      if (res.token && res.userId && res.username) {
        persist(res as AuthResponse);
      }
      return res;
    },
    [persist],
  );

  const loginWithGoogle = useCallback(
    async (data: GoogleLoginRequest) => {
      const res = await authApi.googleLogin(data);
      persist(res);
    },
    [persist],
  );

  const verifyRegistrationOtp = useCallback(
    async (data: VerifyRegistrationRequest) => {
      const res = await authApi.verifyRegistrationOtp(data);
      persist(res);
    },
    [persist],
  );

  const resendRegistrationOtp = useCallback((data: ResendRegistrationOtpRequest) => {
    return authApi.resendRegistrationOtp(data);
  }, []);

  const forgotPassword = useCallback((data: ForgotPasswordRequest) => {
    return authApi.forgotPassword(data);
  }, []);

  const resetPassword = useCallback((data: ResetPasswordRequest) => {
    return authApi.resetPassword(data);
  }, []);

  const logout = useCallback(() => {
    clearStoredAuth();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      register,
      loginWithGoogle,
      verifyRegistrationOtp,
      resendRegistrationOtp,
      forgotPassword,
      resetPassword,
      logout,
    }),
    [
      user,
      login,
      register,
      loginWithGoogle,
      verifyRegistrationOtp,
      resendRegistrationOtp,
      forgotPassword,
      resetPassword,
      logout,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
