import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { extractErrorMessage } from "../../utils/errors";
import { consumeGoogleOAuthCallback } from "../../utils/googleOAuth";

const ERROR_MESSAGES: Record<string, string> = {
  access_denied: "Bạn đã huỷ đăng nhập Google.",
  invalid_state: "Phiên đăng nhập Google không hợp lệ, vui lòng thử lại.",
};

function GoogleCallbackPage() {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const result = consumeGoogleOAuthCallback(window.location.hash);

    if (result.error) {
      setError(ERROR_MESSAGES[result.error] || `Đăng nhập Google thất bại (${result.error})`);
      return;
    }

    loginWithGoogle({ credential: result.credential! })
      .then(() => navigate(result.returnTo, { replace: true }))
      .catch((err) => setError(extractErrorMessage(err, "Đăng nhập Google thất bại")));
  }, [loginWithGoogle, navigate]);

  return (
    <div className="text-center">
      {error ? (
        <>
          <p className="text-sm text-red-600">{error}</p>
          <button
            type="button"
            onClick={() => navigate("/login", { replace: true })}
            className="mt-4 text-sm font-medium text-emerald-600"
          >
            Quay lại đăng nhập
          </button>
        </>
      ) : (
        <p className="text-sm text-gray-500">Đang đăng nhập với Google...</p>
      )}
    </div>
  );
}

export default GoogleCallbackPage;
