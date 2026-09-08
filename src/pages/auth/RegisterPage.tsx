import { useMemo, useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/form/PasswordInput";
import { useAuth } from "../../context/AuthContext";
import { extractErrorMessage } from "../../utils/errors";

const STRENGTH_LABELS = ["Yếu", "Trung bình", "Khá", "Mạnh"];
const STRENGTH_COLORS = ["bg-red-400", "bg-amber-400", "bg-lime-500", "bg-emerald-500"];
const VN_PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)\d{8}$/;

function passwordStrength(password: string): number {
  if (password.length === 0) return -1;
  if (password.length < 6) return 0;
  if (password.length < 10) return 1;
  if (password.length < 14) return 2;
  return 3;
}

function RegisterPage() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const strength = useMemo(() => passwordStrength(form.password), [form.password]);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!VN_PHONE_REGEX.test(form.phone)) {
      setError("Số điện thoại không hợp lệ (VD: 0912345678)");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Mật khẩu nhập lại không khớp");
      return;
    }
    if (form.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setLoading(true);
    try {
      const { confirm: _confirm, ...payload } = form;
      const res = await register(payload);
      if (res.requiresOtp) {
        navigate("/verify-phone", { state: { phone: payload.phone, devOtp: res.devOtp } });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError(extractErrorMessage(err, "Đăng ký thất bại"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">Đăng ký</h1>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Tên đăng nhập</label>
          <input
            type="text"
            required
            minLength={3}
            value={form.username}
            onChange={update("username")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Họ và tên</label>
          <input
            type="text"
            required
            value={form.fullName}
            onChange={update("fullName")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Số điện thoại</label>
          <input
            type="tel"
            required
            placeholder="0912345678"
            value={form.phone}
            onChange={update("phone")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-gray-400">
            Mã OTP xác thực tài khoản sẽ được gửi tới số này.
          </p>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Mật khẩu</label>
          <PasswordInput
            required
            minLength={6}
            value={form.password}
            onChange={update("password")}
          />
          {strength >= 0 && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex flex-1 gap-1">
                {STRENGTH_COLORS.map((color, i) => (
                  <div
                    key={color}
                    className={`h-1.5 flex-1 rounded-full ${i <= strength ? color : "bg-gray-200"}`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">{STRENGTH_LABELS[strength]}</span>
            </div>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Nhập lại mật khẩu</label>
          <PasswordInput
            required
            minLength={6}
            value={form.confirm}
            onChange={update("confirm")}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Đã có tài khoản?{" "}
        <Link to="/login" className="font-medium text-emerald-600">
          Đăng nhập
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
