import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CategoryProductsComponent from '../../../components/Product/CategoryProducts/CategoryProducts';
import { getCategoryProducts } from '../../../store/actions';

const CategoryProducts = ({
    match,
    products,
    getProducts,
    loading,
    ...props
}) => {
    const categoryId = match.params.category_id;
    const childProps = {
        ...props,
        products,
        loading,
    };

    useEffect(() => {
        if (!products.length) {
            getProducts(categoryId);
        }
        // eslint-disable-next-line
    }, [categoryId]);

    return <CategoryProductsComponent {...childProps} />;
};

CategoryProducts.defaultProps = {
    products: [],
};

CategoryProducts.propTypes = {
    loading: PropTypes.bool.isRequired,
    products: PropTypes.array.isRequired,
    getProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { match }) => {
    return {
        products: state.product.category_products[match.params.category_id],
        loading: state.product.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProducts: category_id => dispatch(getCategoryProducts(category_id)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryProducts);
