import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <Link to="/" className="text-xl font-semibold text-emerald-600">
        PlotFarm
      </Link>
      <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
        <Link to="/farms" className="hover:text-emerald-600">
          Farm / Plot
        </Link>
        <Link to="/my-plots" className="hover:text-emerald-600">
          Ô đất của tôi
        </Link>

        {isAuthenticated ? (
          <>
            <span className="text-gray-800">{user?.fullName || user?.username}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-emerald-600">
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
            >
              Đăng ký
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
