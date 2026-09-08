export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface GoogleLoginRequest {
  credential: string;
}

export interface VerifyRegistrationRequest {
  phone: string;
  otp: string;
}

export interface ResendRegistrationOtpRequest {
  phone: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  username: string;
  fullName?: string;
  email?: string;
  roles: string[];
}

export interface RegisterResponse {
  token?: string;
  userId?: string;
  username?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  roles?: string[];
  requiresOtp?: boolean;
  otpPurpose?: string;
  /** Dev-only convenience so a mock/offline backend can surface the code without a real SMS gateway. Never present from the real API. */
  devOtp?: string;
}

export interface OtpIssuedResponse {
  devOtp?: string;
}

export interface AuthApi {
  login(data: LoginRequest): Promise<AuthResponse>;
  register(data: RegisterRequest): Promise<RegisterResponse>;
  googleLogin(data: GoogleLoginRequest): Promise<AuthResponse>;
  verifyRegistrationOtp(data: VerifyRegistrationRequest): Promise<AuthResponse>;
  resendRegistrationOtp(data: ResendRegistrationOtpRequest): Promise<OtpIssuedResponse>;
  forgotPassword(data: ForgotPasswordRequest): Promise<OtpIssuedResponse>;
  resetPassword(data: ResetPasswordRequest): Promise<void>;
}
