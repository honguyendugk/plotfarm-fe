import { Link, Outlet, useLocation } from "react-router-dom";

function AuthLayout() {
  const location = useLocation();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-farm-100 via-farm-50 to-soil-100 px-4">
      <span className="absolute left-10 top-16 text-6xl opacity-25 animate-float-slow select-none">
        🌾
      </span>
      <span className="absolute right-16 top-10 text-5xl opacity-25 animate-float select-none">
        🌻
      </span>
      <span className="absolute bottom-12 left-1/4 text-5xl opacity-20 animate-float-slow select-none">
        🍃
      </span>
      <span className="absolute bottom-10 right-14 text-6xl opacity-20 animate-float select-none">
        🌱
      </span>

      <div
        key={location.pathname}
        className="animate-fade-up relative z-10 w-full max-w-md rounded-2xl border border-farm-100 bg-white/90 p-8 shadow-lg backdrop-blur-sm"
      >
        <Link
          to="/"
          className="mb-6 flex items-center justify-center gap-2 text-2xl font-semibold text-farm-700"
        >
          <span className="text-2xl">🌱</span>
          <span className="font-display">PlotFarm</span>
        </Link>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
