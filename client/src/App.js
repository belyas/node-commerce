import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ErrorBoundary from './hoc/ErrorBoundary/ErrorBoundary';
import Header from './containers/Header/Header';
import Menu from './containers/Menu/Menu';
import { authCheckState } from './store/actions';

const Logout = lazy(() => import('./containers/Auth/Logout'));
const Auth = lazy(() => import('./containers/Auth/Auth'));
const Home = lazy(() => import('./containers/Home/Home'));
const CategoryProducts = lazy(() =>
    import('./containers/Products/CategoryProducts/CategoryProducts')
);
const ProductDetail = lazy(() =>
    import('./containers/Products/ProductDetail/ProductDetait')
);

class App extends Component {
    componentDidMount() {
        this.props.authCheckState();
    }

    render() {
        return (
            <div className="container-fluid">
                <ErrorBoundary>
                    <Header />
                    <Menu />
                    <Suspense fallback={<div>Loading...</div>}>
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
                            <Route
                                path="/login"
                                render={() =>
                                    this.props.isAuthenticated ? (
                                        <Redirect to="/" />
                                    ) : (
                                        <Auth />
                                    )
                                }
                            />
                            <Route path="/logout" component={Logout} />
                        </Switch>
                    </Suspense>
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
