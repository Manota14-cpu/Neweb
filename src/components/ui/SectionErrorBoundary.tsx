import { Component, type ReactNode, type ErrorInfo } from 'react'

interface Props { children: ReactNode; fallback?: ReactNode }
interface State { hasError: boolean }

export default class SectionErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // error logged silently
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="py-20 text-center">
          <p className="text-[10px] uppercase tracking-widest font-body text-white">
            This section could not be loaded
          </p>
        </div>
      )
    }
    return this.props.children
  }
}
