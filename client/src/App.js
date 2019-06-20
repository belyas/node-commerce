import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ErrorBoundary from './hoc/ErrorBoundary/ErrorBoundary';
import AsyncComponent from './hoc/AsyncComponent/AsyncComponent';
import Header from './components/Header/Header';
import Menu from './containers/Menu/Menu';
import Home from './components/Home/Home';
import { authCheckState } from './store/actions';
import CategoryProducts from './containers/Products/CategoryProducts/CategoryProducts';
import ProductDetail from './containers/Products/ProductDetail/ProductDetait';

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
                        <Route
                            path="/category/:category_id"
                            component={CategoryProducts}
                        />
                        <Route
                            path="/product/:product_id"
                            component={ProductDetail}
                        />
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
