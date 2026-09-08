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
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-farm-100 bg-white/80 px-6 backdrop-blur-md">
      <Link to="/" className="group flex items-center gap-2 text-xl font-semibold text-farm-700">
        <span className="inline-block origin-bottom text-2xl transition-transform duration-300 group-hover:animate-sway">
          🌱
        </span>
        <span className="font-display tracking-tight">PlotFarm</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
        <Link to="/farms" className="group relative py-1 hover:text-farm-700">
          Farm / Plot
          <span className="absolute inset-x-0 -bottom-0.5 h-0.5 scale-x-0 bg-farm-500 transition-transform duration-300 group-hover:scale-x-100" />
        </Link>
        <Link to="/my-plots" className="group relative py-1 hover:text-farm-700">
          Ô đất của tôi
          <span className="absolute inset-x-0 -bottom-0.5 h-0.5 scale-x-0 bg-farm-500 transition-transform duration-300 group-hover:scale-x-100" />
        </Link>

        {isAuthenticated ? (
          <>
            <span className="text-gray-800">{user?.fullName || user?.username}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-gray-300 px-4 py-2 transition-colors duration-200 hover:border-farm-300 hover:bg-farm-50 hover:text-farm-700"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="group relative py-1 hover:text-farm-700">
              Đăng nhập
              <span className="absolute inset-x-0 -bottom-0.5 h-0.5 scale-x-0 bg-farm-500 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-farm-600 px-4 py-2 text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-farm-700 hover:shadow-md"
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
