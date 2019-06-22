import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getProducts } from '../../store/actions';
import HomeComponent from '../../components/Home/Home';

const Home = ({ products, getProducts, loading }) => {
    useEffect(() => {
        if (!products.length) {
            getProducts();
        }
        // eslint-disable-next-line
    }, [products]);

    const props = { loading, products };
    return <HomeComponent {...props} />;
};

const mapStateToProps = state => {
    return {
        loading: state.product.loading,
        products: state.product.products,
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ getProducts }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
