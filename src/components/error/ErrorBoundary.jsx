import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log error to monitoring service
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-white mb-2">
                Something went wrong
              </h1>
              <p className="text-gray-400 mb-6">
                We apologize for the inconvenience. Please try refreshing the
                page or contact support if the problem persists.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={this.handleReload}
                className="w-full flex items-center justify-center px-6 py-3 bg-primary-purple text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                <RefreshCw size={20} className="mr-2" />
                Reload Page
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="w-full flex items-center justify-center px-6 py-3 border border-gray-600 text-gray-300 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                <Home size={20} className="mr-2" />
                Go Home
              </button>
            </div>

            {/* Development Error Details */}
            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="mt-8 p-4 bg-red-900/20 border border-red-800 rounded-lg text-left">
                <h3 className="text-red-400 font-semibold mb-2">
                  Error Details:
                </h3>
                <pre className="text-red-300 text-xs whitespace-pre-wrap">
                  {this.state.error.toString()}
                </pre>
                {this.state.errorInfo.componentStack && (
                  <>
                    <h4 className="text-red-400 font-semibold mt-3 mb-2">
                      Component Stack:
                    </h4>
                    <pre className="text-red-300 text-xs whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
