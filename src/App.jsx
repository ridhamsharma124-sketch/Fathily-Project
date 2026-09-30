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
import DonationsDashboardPage from "./pages/Admin/Gifts&Donations/DonationDashboard";
import DonationDetailsPage from "./pages/Admin/Gifts&Donations/DonationDetailsPage";
import RecordDonationPage from "./pages/Admin/Gifts&Donations/RecoardDonation";
import ChapterStoriesPage from "./pages/Admin/ChapterStories/ChapterStories";
import AddChapterStoryPage from "./pages/Admin/ChapterStories/AddChapterStories";
import JournalSettingsPage from "./pages/Admin/Journal/JournalSettings";
import SiteSettingsPage from "./pages/Admin/Settings/SiteSettings";
import NotificationsPage from "./pages/Admin/Notification/NotificationPage";
import CreateNotificationPage from "./pages/Admin/Notification/CreateNotificationPage";
import Activities from "./pages/Admin/Activities/Activities";
import AddQuizQuestions from "./pages/Admin/Activities/AddQuizQuestions";
import AIQuizGenerator from "./pages/Admin/Activities/AIQuizGenerator";
import AddQuestionManually from "./pages/Admin/Activities/AddQuestionManually";
import BulkUploadQuizQuestions from "./pages/Admin/Activities/BulkUploadQuizQuestions";
import AddWordSearch from "./pages/Admin/Activities/AddWordSearch";
import AddChapterAudioStory from "./pages/Admin/Activities/AddChapterAudioStory";
import AddMemoryVerse from "./pages/Admin/Activities/AddMemoryVerse";
import CouponCodesPage from "./pages/Admin/CouponCodes/CouponCodePage";
import CreateCouponPage from "./pages/Admin/CouponCodes/CreateCouponCode";
import BroadSpectrumPage from "./pages/Admin/BroadSpectrum/BroadSpectrumPage";
import DivineCounselManagementPage from "./pages/Admin/DivineCounsel/DivineCounselPage";
import AddDivineCounselTopicPage from "./pages/Admin/DivineCounsel/AddDivineCounselPage";
import GroupPlaySettings from "./pages/Admin/GroupPlay/GroupPlaySettings";
import BibleBooksPage from "./pages/Admin/BibleBooks/BibleBookPage";
import EditBookPage from "./pages/Admin/BibleBooks/EditBibleBook";

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
        <Route path="pray-with-me/settings" element={<PrayWithMeSettingsPage />} />
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
        <Route path="donations" element={<DonationsDashboardPage />} />
        <Route path="donations/:id" element={<DonationDetailsPage />} />
        <Route path="donations/add" element={<RecordDonationPage />} />
        <Route path="chapter-stories" element={<ChapterStoriesPage />} />
        <Route path="chapter-stories/add" element={<AddChapterStoryPage />} />
        <Route path="journal-settings" element={<JournalSettingsPage />} />
        <Route path="settings/site-settings" element={<SiteSettingsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="notifications/create" element={<CreateNotificationPage />} />
        <Route path="activities" element={<Activities />} />
        <Route path="activities/quiz/add-questions" element={<AddQuizQuestions />} />
        <Route path="activities/quiz/ai-generator" element={<AIQuizGenerator />} />
        <Route path="activities/quiz/add-question-manually" element={<AddQuestionManually />}/>
        <Route  path="activities/quiz/bulk-upload"element={<BulkUploadQuizQuestions />}/>
        <Route path="activities/word-search/add" element={<AddWordSearch />}/>
        <Route path="activities/chapter-audio-story/add" element={<AddChapterAudioStory />}/>
        <Route path="activities/memory-verse/add" element={<AddMemoryVerse />}/>
        <Route path="coupon-codes" element={<CouponCodesPage />} />
        <Route path="coupon-codes/create" element={<CreateCouponPage />} />
        <Route path="broad-spectrum" element={<BroadSpectrumPage />} />
        <Route path="divine-counsel" element={<DivineCounselManagementPage />} />
        <Route path="divine-counsel/add" element={<AddDivineCounselTopicPage />} />
        <Route path="group-play-settings" element={<GroupPlaySettings />} />
        <Route path="bible-books" element={<BibleBooksPage />} />
        <Route path="bible-books/edit/:id" element={<EditBookPage />} />
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