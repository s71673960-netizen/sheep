import React from 'react';
import { createRoot } from 'react-dom/client';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return React.createElement('pre', {
        style: { padding: 20, color: 'red', whiteSpace: 'pre-wrap' }
      }, String(this.state.error?.stack || this.state.error));
    }
    return this.props.children;
  }
}

import App from './docs/App';

createRoot(document.getElementById('root')).render(
  React.createElement(ErrorBoundary, null, React.createElement(App))
);
