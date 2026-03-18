import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {error: string | null}> {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error: error.message };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{padding: '40px', fontFamily: 'monospace', background: '#1a1a2e', color: '#ff6b6b', minHeight: '100vh'}}>
          <h2>⚠️ App Error</h2>
          <pre style={{whiteSpace: 'pre-wrap', marginTop: '16px', color: '#ffd700'}}>{this.state.error}</pre>
          <p style={{color: '#aaa', marginTop: '16px'}}>Please share this error to help fix the issue.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
