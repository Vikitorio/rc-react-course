import { Component, ErrorInfo, ReactNode } from 'react';
import Button from '../Button/Button';
interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Logged Error:', error, errorInfo);
  }
  componentRefresh = () => {
    this.setState({ hasError: false });
  };
  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Error is happen.</h1>
          <Button onClick={this.componentRefresh}>Refresh</Button>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
