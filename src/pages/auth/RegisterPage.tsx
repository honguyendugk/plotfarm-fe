import { useMemo, useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/form/PasswordInput";
import { useAuth } from "../../context/AuthContext";
import { extractErrorMessage } from "../../utils/errors";

const STRENGTH_LABELS = ["Yếu", "Trung bình", "Khá", "Mạnh"];
const STRENGTH_COLORS = ["bg-red-400", "bg-amber-400", "bg-lime-500", "bg-farm-500"];
const VN_PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)\d{8}$/;

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 shadow-sm transition-all duration-200 focus:border-farm-400 focus:outline-none focus:ring-4 focus:ring-farm-100";
const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

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
      <div className="mb-6 text-center">
        <span className="text-3xl">🌻</span>
        <h1 className="font-display mt-1 text-2xl font-bold text-farm-800">Tạo tài khoản mới</h1>
        <p className="mt-1 text-sm text-gray-500">Gia nhập PlotFarm và bắt đầu vụ mùa của riêng bạn.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>Tên đăng nhập</label>
          <input
            type="text"
            required
            minLength={3}
            value={form.username}
            onChange={update("username")}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Họ và tên</label>
          <input
            type="text"
            required
            value={form.fullName}
            onChange={update("fullName")}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Số điện thoại</label>
          <input
            type="tel"
            required
            placeholder="0912345678"
            value={form.phone}
            onChange={update("phone")}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-gray-400">
            Mã OTP xác thực tài khoản sẽ được gửi tới số này.
          </p>
        </div>
        <div>
          <label className={labelClass}>Mật khẩu</label>
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
                    className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= strength ? color : "bg-gray-200"}`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">{STRENGTH_LABELS[strength]}</span>
            </div>
          )}
        </div>
        <div>
          <label className={labelClass}>Nhập lại mật khẩu</label>
          <PasswordInput
            required
            minLength={6}
            value={form.confirm}
            onChange={update("confirm")}
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-farm-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-farm-700 hover:shadow-md disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Đã có tài khoản?{" "}
        <Link to="/login" className="font-medium text-farm-600 hover:text-farm-700 hover:underline">
          Đăng nhập
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
