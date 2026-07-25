import Box from '@mui/material/Box';
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';
import { AppLayout } from '@/templates/AppLayout';

type AppErrorBoundaryProps = {
  children: ReactNode;
  resetKey: string;
};

type AppErrorBoundaryState = {
  error: Error | null;
};

class AppErrorBoundaryRoot extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled application error', error, errorInfo);
  }

  componentDidUpdate(prevProps: AppErrorBoundaryProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  handleReset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
          <AppLayout>
            <ErrorPage error={error} onReset={this.handleReset} />
          </AppLayout>
        </Box>
      );
    }

    return this.props.children;
  }
}

export function AppErrorBoundary({ children }: { children: ReactNode }) {
  const location = useLocation();

  return <AppErrorBoundaryRoot resetKey={location.pathname} children={children} />;
}
