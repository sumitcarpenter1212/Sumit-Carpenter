import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainSite from './MainSite';
import AdminPanel from './AdminPanel';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}
