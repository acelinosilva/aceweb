import { Component } from 'react';
import { AlertCircle } from 'lucide-react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#111',
                    color: '#fff',
                    padding: '2rem',
                    textAlign: 'center',
                    fontFamily: 'system-ui, sans-serif'
                }}>
                    <AlertCircle size={64} color="#ef4444" style={{ marginBottom: '1rem' }} />
                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ops! Algo deu errado.</h1>
                    <p style={{ color: '#aaa', marginBottom: '2rem', maxWidth: '600px' }}>
                        Desculpe, ocorreu um erro inesperado. Tente recarregar a página.
                    </p>

                    <div style={{
                        background: '#1a1a1a',
                        padding: '1rem',
                        borderRadius: '8px',
                        maxWidth: '800px',
                        overflow: 'auto',
                        textAlign: 'left',
                        border: '1px solid #333'
                    }}>
                        <p style={{ color: '#ef4444', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                            {this.state.error && this.state.error.toString()}
                        </p>
                        <pre style={{ color: '#888', fontSize: '0.8rem' }}>
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>

                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: '2rem',
                            padding: '10px 20px',
                            background: '#22c55e',
                            color: 'black',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Recarregar Página
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
