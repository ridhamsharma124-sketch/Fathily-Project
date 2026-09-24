import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/Admin/Dashboard";
import Subscription from "./pages/Admin/Subscription";
import DailyVersesPage from "./pages/Admin/DailyVerse/DailyVerse";
import AddDailyVerseWizard from "./pages/Admin/DailyVerse/AddDailyVerse";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      <Route path="/admin" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="subscriptions" element={<Subscription />} />
        <Route path="dailyverse" element={<DailyVersesPage />} />
        <Route path="dailyverse/add" element={<AddDailyVerseWizard />} />
      </Route>
      <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
      <Route
        path="/subscriptions"
        element={<Navigate to="/admin/subscriptions" replace />}
      />
       <Route path="/dailyverse" element={<DailyVersesPage />} />
      <Route path="/dailyverse/add" element={<AddDailyVerseWizard />} />

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App