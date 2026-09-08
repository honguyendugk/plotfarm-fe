import { Link, Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <Link
          to="/"
          className="mb-6 block text-center text-2xl font-semibold text-emerald-600"
        >
          PlotFarm
        </Link>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
