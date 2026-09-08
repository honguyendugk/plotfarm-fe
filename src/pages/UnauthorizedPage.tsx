import { Link } from "react-router-dom";

function UnauthorizedPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">403 — Không có quyền truy cập</h1>
      <p className="mt-1 text-sm text-gray-500">
        Tài khoản của bạn không có quyền xem trang này.
      </p>
      <Link to="/" className="mt-2 inline-block text-emerald-600">
        Về trang chủ
      </Link>
    </div>
  );
}

export default UnauthorizedPage;
