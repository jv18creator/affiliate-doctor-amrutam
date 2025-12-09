import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AffiliateDashboard from './pages/affiliate/AffiliateDashboard';
import ReferralTool from './pages/affiliate/ReferralTool';
import EarningHistory from './pages/affiliate/EarningHistory';
import JoinAffiliate from './pages/affiliate/JoinAffiliate';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/affiliate/join" replace />} />
        <Route path="/affiliate/dashboard" element={<AffiliateDashboard />} />
        <Route path="/affiliate/referral-tool" element={<ReferralTool />} />
        <Route path="/affiliate/referral-tool/:productId" element={<ReferralTool />} />
        <Route path="/affiliate/earning-history" element={<EarningHistory />} />
      </Route>

      {/* onboarding modal over dashboard: it will appear everytime for now whenever user visits / */}
      {/* we can save this preference in local storage in future but for demonstration purpose I am leaving it active */}
      <Route
        path="/affiliate/join"
        element={
          <MainLayout>
            <JoinAffiliate />
          </MainLayout>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
