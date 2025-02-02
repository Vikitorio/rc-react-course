import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}
interface ErrorBoundaryState {
    hasError: boolean;
}
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false };


    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Logged Error:", error, errorInfo);
    }
    componentRefresh = () => {
        this.setState({hasError: false});

    }
    render() {
        if (this.state.hasError) {
            return <>
            <h1>Error is happen.</h1>
            <button onClick={this.componentRefresh}>Refresh</button>
            </>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;