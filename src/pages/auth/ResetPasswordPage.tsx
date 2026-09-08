import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DevOtpHint from "../../components/form/DevOtpHint";
import PasswordInput from "../../components/form/PasswordInput";
import { useAuth } from "../../context/AuthContext";
import { extractErrorMessage } from "../../utils/errors";

interface LocationState {
  email?: string;
  devOtp?: string;
}

function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as LocationState) || {};

  const [email, setEmail] = useState(state.email || "");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirm) {
      setError("Mật khẩu nhập lại không khớp");
      return;
    }
    if (newPassword.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setLoading(true);
    try {
      await resetPassword({ email, otp, newPassword });
      setSuccess(true);
    } catch (err) {
      setError(extractErrorMessage(err, "Đặt lại mật khẩu thất bại"));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <h1 className="text-xl font-semibold text-gray-900">Đặt lại mật khẩu thành công</h1>
        <p className="mt-2 text-sm text-gray-500">Bạn có thể đăng nhập lại bằng mật khẩu mới.</p>
        <button
          type="button"
          onClick={() => navigate("/login", { replace: true })}
          className="mt-6 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Đăng nhập
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">Đặt lại mật khẩu</h1>

      <DevOtpHint otp={state.devOtp} />

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Mã OTP</label>
          <input
            type="text"
            required
            inputMode="numeric"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm tracking-widest focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Mật khẩu mới</label>
          <PasswordInput
            required
            minLength={6}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Nhập lại mật khẩu mới</label>
          <PasswordInput
            required
            minLength={6}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        <Link to="/login" className="font-medium text-emerald-600">
          Quay lại đăng nhập
        </Link>
      </p>
    </div>
  );
}

export default ResetPasswordPage;
