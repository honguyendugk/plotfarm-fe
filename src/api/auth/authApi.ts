import axiosClient from "../axiosClient";
import { unwrapApiData } from "../../utils/api";
import type {
  AuthApi,
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
} from "./types";

const realAuthApi: AuthApi = {
  async login(data: LoginRequest) {
    const res = await axiosClient.post("/auth/login", data);
    return unwrapApiData<AuthResponse>(res.data, res.data);
  },
  async register(data: RegisterRequest) {
    const res = await axiosClient.post("/auth/register", data);
    return unwrapApiData<RegisterResponse>(res.data, res.data);
  },
  async googleLogin(data: GoogleLoginRequest) {
    const res = await axiosClient.post("/auth/google", data);
    return unwrapApiData<AuthResponse>(res.data, res.data);
  },
  async verifyRegistrationOtp(data: VerifyRegistrationRequest) {
    const res = await axiosClient.post("/auth/verify-phone", data);
    return unwrapApiData<AuthResponse>(res.data, res.data);
  },
  async resendRegistrationOtp(data: ResendRegistrationOtpRequest) {
    const res = await axiosClient.post("/auth/resend-otp", data);
    return unwrapApiData<OtpIssuedResponse>(res.data, {});
  },
  async forgotPassword(data: ForgotPasswordRequest) {
    const res = await axiosClient.post("/auth/forgot-password", data);
    return unwrapApiData<OtpIssuedResponse>(res.data, {});
  },
  async resetPassword(data: ResetPasswordRequest) {
    await axiosClient.post("/auth/reset-password", data);
  },
};

export default realAuthApi;
