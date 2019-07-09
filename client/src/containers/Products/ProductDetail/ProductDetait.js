import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import ProductDetailComponent from '../../../components/Product/ProductDetail/ProductDetail';
import { getProduct } from '../../../store/actions';

const ProductDetail = ({ match, getProduct, product, loading }) => {
    const product_id = match.params.product_id;
    const _props = { loading, product };
    const isProductEmpty = Object.keys(product).length === 0;

    useEffect(() => {
        if (isProductEmpty) {
            getProduct(product_id);
        }
        // eslint-disable-next-line
    }, [product_id]);

    return <ProductDetailComponent {..._props} />;
};

ProductDetail.defaultProps = {
    product: {},
};

ProductDetail.propTypes = {
    loading: PropTypes.bool.isRequired,
    product: PropTypes.object.isRequired,
    getProduct: PropTypes.func.isRequired,
    match: PropTypes.object,
};

const mapStateToProps = (state, { match }) => {
    return {
        product: state.product.single_product[match.params.product_id],
        loading: state.product.loading,
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ getProduct }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetail);
