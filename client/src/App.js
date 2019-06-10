import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Login from './components/Auth/Login/Login';
import * as actions from './store/actions';

class App extends Component {
    componentDidMount() {
        this.props.checkUserStatus();
    }

    render() {
        let extraRoutes = null;

        // if (!this.props.isAuthenticated) {
        extraRoutes = <Route path="/login" component={Login} />;
        // }

        return (
            <div>
                <Header />
                <Menu />
                <Switch>
                    <Route path="/" exact component={() => <div>Home</div>} />
                    {extraRoutes}
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkUserStatus: () => dispatch(actions.authCheckState()),
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
