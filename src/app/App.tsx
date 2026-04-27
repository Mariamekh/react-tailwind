import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '@/shared/layout/Header';
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary';
import { SearchPage } from './pages/SearchPage';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Navigate to="/s" replace />} />
            <Route path="/s" element={<SearchPage />} />
            <Route path="/ka/s" element={<SearchPage />} />
            <Route path="*" element={<Navigate to="/s" replace />} />
          </Routes>
        </ErrorBoundary>
      </main>
    </div>
  );
}
