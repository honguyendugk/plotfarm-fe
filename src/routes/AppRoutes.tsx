import { Route, Routes } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import MainLayout from "../components/layout/MainLayout";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import GoogleCallbackPage from "../pages/auth/GoogleCallbackPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import VerifyPhonePage from "../pages/auth/VerifyPhonePage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";

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
        <Route path="unauthorized" element={<UnauthorizedPage />} />

        {/* TODO: farms/rent/my-plots routes re-added once Task 3 (Farm/Rental pages) is pushed */}

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
