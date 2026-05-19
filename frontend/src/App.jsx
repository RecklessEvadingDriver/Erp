import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { io } from 'socket.io-client';
import Layout from './components/Layout.jsx';
import AppProvider from './context/AppContext.jsx';
import AssistantPage from './pages/AssistantPage.jsx';
import AttendancePage from './pages/AttendancePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import FeesPage from './pages/FeesPage.jsx';
import StudentsPage from './pages/StudentsPage.jsx';

const socket = io(import.meta.env.VITE_SOCKET_URL || window.location.origin, { autoConnect: false });

function RealtimeBanner() {
  const [message, setMessage] = useState('Realtime: disconnected');

  useEffect(() => {
    socket.connect();
    socket.on('server:hello', ({ message: text }) => setMessage(`Realtime: ${text}`));
    socket.on('connect_error', () => setMessage('Realtime: offline mode'));
    return () => {
      socket.off('server:hello');
      socket.off('connect_error');
      socket.disconnect();
    };
  }, []);

  return <div className="mb-4 rounded-lg bg-slate-900 px-3 py-2 text-xs text-slate-100 dark:bg-slate-800">{message}</div>;
}

export default function App() {
  return (
    <AppProvider>
      <Layout>
        <RealtimeBanner />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/fees" element={<FeesPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
        </Routes>
      </Layout>
    </AppProvider>
  );
}
