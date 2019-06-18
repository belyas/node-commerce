import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProductDetailComponent from '../../../components/Product/ProductDetail/ProductDetail';
import { getProduct } from '../../../store/actions';

const ProductDetail = props => {
    const { match, getProduct, product } = props;
    const product_id = match.params.product_id;

    useEffect(() => {
        if (!product) {
            getProduct(product_id);
        }
    }, []);

    return <ProductDetailComponent {...props} product_id={product_id} />;
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
