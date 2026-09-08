import { Link } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";

function NotFoundPage() {
  return (
    <div>
      <PageHeader
        icon="🐓"
        title="404 — Không tìm thấy trang"
        subtitle="Có vẻ bạn đã đi lạc ra ngoài ranh giới nông trại."
        tone="soil"
      />
      <Link to="/" className="inline-block text-farm-700 hover:underline">
        Về trang chủ
      </Link>
    </div>
  );
}

export default NotFoundPage;
