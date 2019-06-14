import React, { Component } from 'react';

const asyncComponent = WrappedComponent => {
    return class extends Component {
        state = { component: null };

        componentDidMount() {
            WrappedComponent().then(component => {
                this.setState({ component: component.default });
            });
        }

        render() {
            const { Component } = this.state;
            return Component ? <Component {...this.props} /> : null;
        }
    };
};

export default asyncComponent;
