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
    const { category_id } = match.params;
    const childProps = {
        ...props,
        products,
        loading,
    };

    useEffect(() => {
        if (!products.length) {
            getProducts(category_id);
        }
        // eslint-disable-next-line
    }, [category_id]);

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

const mapStateToProps = ({ product }, { match: { params } }) => ({
    products: product.category_products[params.category_id],
    loading: product.loading,
});

const mapDispatchToProps = dispatch => ({
    getProducts: category_id => dispatch(getCategoryProducts(category_id)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryProducts);
