import { Link } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";

function UnauthorizedPage() {
  return (
    <div>
      <PageHeader
        icon="🚧"
        title="403 — Không có quyền truy cập"
        subtitle="Tài khoản của bạn không có quyền vào khu đất này."
        tone="soil"
      />
      <Link to="/" className="inline-block text-farm-700 hover:underline">
        Về trang chủ
      </Link>
    </div>
  );
}

export default UnauthorizedPage;
