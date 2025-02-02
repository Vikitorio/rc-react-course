import './App.css';
import MainLayout from './layouts/MainLayout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
function App() {
  return (
    <ErrorBoundary>
      <MainLayout />
    </ErrorBoundary>
  );
}

export default App;
