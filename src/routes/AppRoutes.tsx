import { Route, Routes } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import MainLayout from "../components/layout/MainLayout";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import GoogleCallbackPage from "../pages/auth/GoogleCallbackPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import VerifyPhonePage from "../pages/auth/VerifyPhonePage";
import FarmListPage from "../pages/farm/FarmListPage";
import PlotDetailPage from "../pages/farm/PlotDetailPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import MyPlotsPage from "../pages/rental/MyPlotsPage";
import RentPlotPage from "../pages/rental/RentPlotPage";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="verify-phone" element={<VerifyPhonePage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="auth/google/callback" element={<GoogleCallbackPage />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="farms" element={<FarmListPage />} />
        <Route path="farms/plots/:plotId" element={<PlotDetailPage />} />
        <Route path="unauthorized" element={<UnauthorizedPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="rent" element={<RentPlotPage />} />
          <Route path="my-plots" element={<MyPlotsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
