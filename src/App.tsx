import './App.css';
import MainLayout from './layouts/MainLayout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter, Route, Routes } from 'react-router';
import ItemDetailed from './ItemDetailed/ItemDetailed';
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="info/*" element={<MainLayout />}>
            <Route path=":id" element={<ItemDetailed />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
