import { useState, type FormEvent } from "react";
import { Link, Navigate, useLocation, useNavigate, type Location } from "react-router-dom";
import GoogleIcon from "../../components/icons/GoogleIcon";
import PasswordInput from "../../components/form/PasswordInput";
import { useAuth } from "../../context/AuthContext";
import { extractErrorMessage } from "../../utils/errors";
import { buildGoogleLoginUrl } from "../../utils/googleOAuth";

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
      <h1 className="text-xl font-semibold text-gray-900">Đăng nhập</h1>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Tên đăng nhập hoặc email
          </label>
          <input
            type="text"
            required
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <Link to="/forgot-password" className="text-xs font-medium text-emerald-600">
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
            className="rounded border-gray-300"
          />
          Ghi nhớ đăng nhập
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>

      <div className="my-4 flex items-center gap-3 text-xs text-gray-400">
        <div className="h-px flex-1 bg-gray-200" />
        hoặc
        <div className="h-px flex-1 bg-gray-200" />
      </div>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <GoogleIcon />
        Đăng nhập với Google
      </button>

      <p className="mt-6 text-center text-sm text-gray-500">
        Chưa có tài khoản?{" "}
        <Link to="/register" className="font-medium text-emerald-600">
          Đăng ký
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
