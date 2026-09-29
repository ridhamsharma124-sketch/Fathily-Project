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
import DailyReflectionList from "./pages/Admin/DailyReflection/DailyReflectionList";
import AddHistoricalStory from "./pages/Admin/DailyReflection/AddHistoricalStory";
import PrayWithMePage from "./pages/Admin/PrayWithMe/PrayWithMe";
import PrayWithMeSettingsPage from "./pages/Admin/PrayWithMe/PrayWithMeSetting";
import SoundAudio from "./pages/Admin/SoundAudio/SoundAudio";
import AIOverview from "./pages/Admin/AIEngagement/AIOverview";
import AIExperience from "./pages/Admin/AIEngagement/AIExperience";
import AICredits from "./pages/Admin/AIEngagement/AICredits";
import SeasonalJourneysPage from "./pages/Admin/SeasonalJourney/SeasonalJourney";
import AddSeasonalJourneyWizard from "./pages/Admin/SeasonalJourney/AddSeasonalJourney";
import EditDailyContentPage from "./pages/Admin/SeasonalJourney/EditDailyContent";
import TermsPrivacy from "./pages/Admin/TermsPrivacy/TermsPrivacy";
import EditLegalDocument from "./pages/Admin/TermsPrivacy/EditLegalDocument";
import HelpCenter from "./pages/Admin/HelpCenter/HelpCenter";
import SupportInbox from "./pages/Admin/SupportInbox/SupportInbox";
import Badges from "./pages/Admin/Badges/Badges";
import AddBadge from "./pages/Admin/Badges/AddBadge";

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
        <Route path="dailyreflection" element={<DailyReflectionList />} />
        <Route path="dailyreflection/add" element={<AddHistoricalStory />} />
        <Route path="pray-with-me" element={<PrayWithMePage />} />
        <Route path="pray-with-me/settings" element={<PrayWithMeSettingsPage/>} />
        <Route path="sound-audio" element={<SoundAudio />} />
        <Route path="ai-engagement/overview" element={<AIOverview />} />
        <Route path="ai-engagement/experience" element={<AIExperience />} />
        <Route path="ai-engagement/credits" element={<AICredits />} />
        <Route path="seasonal-journey" element={<SeasonalJourneysPage />} />
        <Route path="seasonal-journey/add" element={<AddSeasonalJourneyWizard />} />
        <Route path="seasonal-journey/add/edit-daily-content" element={<EditDailyContentPage />} />
        <Route path="terms-privacy" element={<TermsPrivacy />} />
        <Route path="terms-privacy/edit" element={<EditLegalDocument />} />
        <Route path="help-center" element={<HelpCenter />} />
      <Route path="support-inbox" element={<SupportInbox />} />
      <Route path="badges" element={<Badges />} />
      <Route path="badges/add" element={<AddBadge />} />
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