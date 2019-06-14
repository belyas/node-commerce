import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.log('Catched error: ', error, info);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Ooops! something went wrong.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
