import { useState, type FormEvent } from "react";
import { Link, Navigate, useLocation, useNavigate, type Location } from "react-router-dom";
import GoogleIcon from "../../components/icons/GoogleIcon";
import PasswordInput from "../../components/form/PasswordInput";
import { useAuth } from "../../context/AuthContext";
import { extractErrorMessage } from "../../utils/errors";
import { buildGoogleLoginUrl } from "../../utils/googleOAuth";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 shadow-sm transition-all duration-200 focus:border-farm-400 focus:outline-none focus:ring-4 focus:ring-farm-100";
const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname || "/";

  const [form, setForm] = useState({ username: "", password: "" });
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form, remember);
      navigate(from, { replace: true });
    } catch (err) {
      setError(extractErrorMessage(err, "Đăng nhập thất bại"));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const url = buildGoogleLoginUrl(from);
    if (!url) {
      setError("Đăng nhập Google chưa được cấu hình (thiếu VITE_GOOGLE_CLIENT_ID).");
      return;
    }
    window.location.href = url;
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <span className="text-3xl">🌿</span>
        <h1 className="font-display mt-1 text-2xl font-bold text-farm-800">Chào mừng trở lại</h1>
        <p className="mt-1 text-sm text-gray-500">Đăng nhập để tiếp tục chăm sóc nông trại của bạn.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>Tên đăng nhập hoặc email</label>
          <input
            type="text"
            required
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <Link to="/forgot-password" className="text-xs font-medium text-farm-600 hover:text-farm-700 hover:underline">
              Quên mật khẩu?
            </Link>
          </div>
          <PasswordInput
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="rounded border-gray-300 accent-farm-600"
          />
          Ghi nhớ đăng nhập
        </label>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-farm-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-farm-700 hover:shadow-md disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-gray-400">
        <div className="h-px flex-1 bg-gray-200" />
        hoặc
        <div className="h-px flex-1 bg-gray-200" />
      </div>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-farm-200 hover:bg-farm-50 hover:shadow-md"
      >
        <GoogleIcon />
        Đăng nhập với Google
      </button>

      <p className="mt-6 text-center text-sm text-gray-500">
        Chưa có tài khoản?{" "}
        <Link to="/register" className="font-medium text-farm-600 hover:text-farm-700 hover:underline">
          Đăng ký
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
