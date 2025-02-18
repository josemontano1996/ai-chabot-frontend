import { Navigate, Route } from 'react-router';
import { Routes } from 'react-router';
import { BrowserRouter } from 'react-router';
import { NotFoundPage } from '@/pages/NotFoundPage';
import ChatPage from './pages/public/ChatPage/ChatPage';
import HomePage from './pages/public/HomePage/HomePage';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to={'/404'} />} />
      </Routes>
    </BrowserRouter>
  );
};
