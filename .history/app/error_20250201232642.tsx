import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // or your navigation hook

export default function ErrorBoundary({ error, reset }) {
  const [showDetails, setShowDetails] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.error('Application Error:', error);
    // Add error reporting service call here (e.g., Sentry, LogRocket)
  }, [error]);

  const handleReset = async () => {
    if (!reset) return;
    
    try {
      setIsResetting(true);
      await reset();
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <main className="error-boundary" role="alert" aria-live="polite">
      <div className="error-content">
        <svg className="error-icon" viewBox="0 0 24 24" width="64" height="64">
          <path fill="currentColor" d="M11 15h2v2h-2v-2m0-8h2v6h-2V7m1-5C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 18a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8"/>
        </svg>

        <h1 className="error-title">Something Went Wrong</h1>
        <p className="error-message">
          We're having trouble loading this page. Please try one of these options:
        </p>

        <div className="error-actions">
          {reset && (
            <button 
              onClick={handleReset}
              disabled={isResetting}
              aria-busy={isResetting}
            >
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="currentColor" d="M17.65 6.35A8 8 0 1 0 19.78 13h-2.09a6 6 0 1 1-1.84-4.44L14 11h7V4l-2.35 2.35Z"/>
              </svg>
              {isResetting ? 'Retrying...' : 'Try Again'}
            </button>
          )}

          <button onClick={() => navigate('/')}>
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5Z"/>
            </svg>
            Return Home
          </button>
        </div>

        <div className="error-details">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            aria-expanded={showDetails}
          >
            {showDetails ? 'Hide Details' : 'Show Error Details'}
          </button>

          {showDetails && (
            <div className="details-content">
              <pre className="error-stack">{error.stack || error.message}</pre>
              <button
                onClick={() => navigator.clipboard.writeText(error.stack)}
                aria-label="Copy error details"
              >
                📋 Copy Error
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}