import './App.css';
import MainLayout from './layouts/MainLayout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter, Route, Routes } from 'react-router';
import ItemDetailed from './ItemDetailed/ItemDetailed';
import ErrorPage from './pages/ErrorPage/ErrorPage';
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<MainLayout />}>
            <Route path=":id" element={<ItemDetailed />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
