import { Link } from 'react-router';
const ErrorPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to={'/dashboard'}>Back to main</Link>
    </div>
  );
};

export default ErrorPage;
