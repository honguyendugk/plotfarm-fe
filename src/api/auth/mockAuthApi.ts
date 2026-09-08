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

interface MockUser {
  userId: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  roles: string[];
  phoneVerified: boolean;
}

interface OtpEntry {
  purpose: string;
  key: string;
  code: string;
  expiresAt: number;
}

const USERS_KEY = "plotfarm_mock_users";
const OTPS_KEY = "plotfarm_mock_otps";
const OTP_TTL_MS = 10 * 60 * 1000;

function readUsers(): MockUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]") as MockUser[];
  } catch {
    return [];
  }
}

function writeUsers(users: MockUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readOtps(): OtpEntry[] {
  try {
    return JSON.parse(localStorage.getItem(OTPS_KEY) || "[]") as OtpEntry[];
  } catch {
    return [];
  }
}

function writeOtps(otps: OtpEntry[]) {
  localStorage.setItem(OTPS_KEY, JSON.stringify(otps));
}

function issueOtp(purpose: string, key: string): string {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const otps = readOtps().filter((o) => !(o.purpose === purpose && o.key === key));
  otps.push({ purpose, key, code, expiresAt: Date.now() + OTP_TTL_MS });
  writeOtps(otps);
  return code;
}

function consumeOtp(purpose: string, key: string, code: string): boolean {
  const otps = readOtps();
  const entry = otps.find((o) => o.purpose === purpose && o.key === key);
  if (!entry || entry.expiresAt < Date.now() || entry.code !== code) return false;
  writeOtps(otps.filter((o) => o !== entry));
  return true;
}

function makeToken(username: string) {
  const payload = { sub: username, exp: Date.now() + 24 * 60 * 60 * 1000 };
  return `mock.${btoa(JSON.stringify(payload))}.token`;
}

function toAuthResponse(user: MockUser): AuthResponse {
  return {
    token: makeToken(user.username),
    userId: user.userId,
    username: user.username,
    fullName: user.fullName,
    email: user.email,
    roles: user.roles,
  };
}

function delay<T>(value: T, ms = 400): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function decodeGoogleCredential(credential: string): { email: string; name?: string } {
  try {
    const payload = credential.split(".")[1];
    const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return { email: json.email, name: json.name };
  } catch {
    throw new Error("Google credential không hợp lệ");
  }
}

const mockAuthApi: AuthApi = {
  async login({ username, password }: LoginRequest) {
    const users = readUsers();
    const user = users.find(
      (u) => (u.username === username || u.email === username) && u.password === password,
    );
    if (!user) throw new Error("Sai tên đăng nhập hoặc mật khẩu");
    if (!user.phoneVerified) {
      throw new Error("Tài khoản chưa xác thực số điện thoại. Vui lòng kiểm tra mã OTP đã gửi.");
    }
    return delay(toAuthResponse(user));
  },

  async register({ username, fullName, email, phone, password }: RegisterRequest) {
    const users = readUsers();
    if (users.some((u) => u.username === username)) {
      throw new Error("Tên đăng nhập đã tồn tại");
    }
    if (users.some((u) => u.email === email)) {
      throw new Error("Email đã được sử dụng");
    }
    if (users.some((u) => u.phone === phone)) {
      throw new Error("Số điện thoại đã được sử dụng");
    }
    const user: MockUser = {
      userId: crypto.randomUUID(),
      username,
      fullName,
      email,
      phone,
      password,
      roles: ["CUSTOMER"],
      phoneVerified: false,
    };
    users.push(user);
    writeUsers(users);
    const devOtp = issueOtp("REGISTER", phone);
    const response: RegisterResponse = { requiresOtp: true, otpPurpose: "REGISTER", phone, devOtp };
    return delay(response);
  },

  async googleLogin({ credential }: GoogleLoginRequest) {
    const { email, name } = decodeGoogleCredential(credential);
    const users = readUsers();
    let user = users.find((u) => u.email === email);
    if (!user) {
      user = {
        userId: crypto.randomUUID(),
        username: email.split("@")[0],
        fullName: name || email,
        email,
        phone: "",
        password: crypto.randomUUID(),
        roles: ["CUSTOMER"],
        phoneVerified: true,
      };
      users.push(user);
      writeUsers(users);
    }
    return delay(toAuthResponse(user));
  },

  async verifyRegistrationOtp({ phone, otp }: VerifyRegistrationRequest) {
    if (!consumeOtp("REGISTER", phone, otp)) {
      throw new Error("Mã OTP không đúng hoặc đã hết hạn");
    }
    const users = readUsers();
    const user = users.find((u) => u.phone === phone);
    if (!user) throw new Error("Không tìm thấy tài khoản");
    user.phoneVerified = true;
    writeUsers(users);
    return delay(toAuthResponse(user));
  },

  async resendRegistrationOtp({ phone }: ResendRegistrationOtpRequest) {
    const users = readUsers();
    if (!users.some((u) => u.phone === phone)) {
      throw new Error("Không tìm thấy tài khoản với số điện thoại này");
    }
    const devOtp = issueOtp("REGISTER", phone);
    const response: OtpIssuedResponse = { devOtp };
    return delay(response);
  },

  async forgotPassword({ email }: ForgotPasswordRequest) {
    const users = readUsers();
    if (!users.some((u) => u.email === email)) {
      throw new Error("Không tìm thấy tài khoản với email này");
    }
    const devOtp = issueOtp("RESET_PASSWORD", email);
    const response: OtpIssuedResponse = { devOtp };
    return delay(response);
  },

  async resetPassword({ email, otp, newPassword }: ResetPasswordRequest) {
    if (!consumeOtp("RESET_PASSWORD", email, otp)) {
      throw new Error("Mã OTP không đúng hoặc đã hết hạn");
    }
    const users = readUsers();
    const user = users.find((u) => u.email === email);
    if (!user) throw new Error("Không tìm thấy tài khoản");
    user.password = newPassword;
    writeUsers(users);
    await delay(undefined);
  },
};

export default mockAuthApi;
