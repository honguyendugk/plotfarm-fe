import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DevOtpHint from "../../components/form/DevOtpHint";
import { useAuth } from "../../context/AuthContext";
import { extractErrorMessage } from "../../utils/errors";

interface LocationState {
  phone?: string;
  devOtp?: string;
}

function VerifyPhonePage() {
  const { verifyRegistrationOtp, resendRegistrationOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as LocationState) || {};

  const [phone, setPhone] = useState(state.phone || "");
  const [otp, setOtp] = useState("");
  const [devOtp, setDevOtp] = useState(state.devOtp);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);
    try {
      await verifyRegistrationOtp({ phone, otp });
      navigate("/", { replace: true });
    } catch (err) {
      setError(extractErrorMessage(err, "Xác thực thất bại"));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setInfo("");
    setResending(true);
    try {
      const res = await resendRegistrationOtp({ phone });
      setDevOtp(res.devOtp);
      setInfo("Đã gửi lại mã OTP.");
    } catch (err) {
      setError(extractErrorMessage(err, "Không thể gửi lại mã OTP"));
    } finally {
      setResending(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">Xác thực số điện thoại</h1>
      <p className="mt-1 text-sm text-gray-500">
        Nhập mã OTP đã gửi tới số điện thoại của bạn để kích hoạt tài khoản.
      </p>

      <DevOtpHint otp={devOtp} />

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Số điện thoại</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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

        {error && <p className="text-sm text-red-600">{error}</p>}
        {info && <p className="text-sm text-emerald-600">{info}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? "Đang xác thực..." : "Xác thực"}
        </button>
        <button
          type="button"
          onClick={handleResend}
          disabled={resending || !phone}
          className="text-sm font-medium text-emerald-600 disabled:opacity-60"
        >
          {resending ? "Đang gửi lại..." : "Gửi lại mã OTP"}
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

export default VerifyPhonePage;
