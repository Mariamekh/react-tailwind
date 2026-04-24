import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/lib/theme';
import { Header } from '@/shared/layout/Header';
import { SearchPage } from './pages/SearchPage';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/s" replace />} />
            <Route path="/s" element={<SearchPage />} />
            <Route path="/ka/s" element={<SearchPage />} />
            <Route path="*" element={<Navigate to="/s" replace />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}
