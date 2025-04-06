import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import VolunteerDashboard from './pages/VolunteerDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/volunteers" element={<VolunteerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
