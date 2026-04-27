import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * React error boundary. Catches render-time errors in descendant components and
 * shows a fallback UI instead of unmounting the whole tree.
 *
 * Note: error boundaries do NOT catch errors in event handlers or async code —
 * those should be handled with try/catch + state, or via React Query's onError.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error('[ErrorBoundary]', error, info.componentStack);
    }
  }

  reset = () => this.setState({ error: null });

  render() {
    if (this.state.error) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div
          role="alert"
          className="m-4 rounded-card border border-error-800 bg-error-100 p-6 text-center"
        >
          <p className="text-[14px] font-medium text-error-800">დაფიქსირდა შეცდომა</p>
          <p className="mt-1 text-[12px] text-ink-700">{this.state.error.message}</p>
          <button
            type="button"
            onClick={this.reset}
            className="mt-3 text-[14px] font-medium text-brand-orange hover:underline"
          >
            ხელახლა ცდა
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
