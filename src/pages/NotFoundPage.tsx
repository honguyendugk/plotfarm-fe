import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900">
        404 — Không tìm thấy trang
      </h1>
      <Link to="/" className="mt-2 inline-block text-emerald-600">
        Về trang chủ
      </Link>
    </div>
  );
}

export default NotFoundPage;
