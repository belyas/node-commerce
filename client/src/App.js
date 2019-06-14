import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ErrorBoundary from './hoc/ErrorBoundary/ErrorBoundary';
import AsyncComponent from './hoc/AsyncComponent/AsyncComponent';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Home from './components/Home/Home';
import { authCheckState } from './store/actions';

const Login = AsyncComponent(() => import('./containers/Auth/Login'));

class App extends Component {
    componentDidMount() {
        this.props.authCheckState();
    }

    render() {
        let extraRoutes = null;

        // if (!this.props.isAuthenticated) {
        extraRoutes = <Route path="/login" component={Login} />;
        // }

        return (
            <div className="container">
                <ErrorBoundary>
                    <Header />
                    <Menu />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        {extraRoutes}
                    </Switch>
                </ErrorBoundary>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ authCheckState }, dispatch);

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
