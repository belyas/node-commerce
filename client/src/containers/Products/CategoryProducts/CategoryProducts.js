import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import CategoryProductsComponent from '../../../components/CategoryProducts/CategoryProducts';
import { getCategoryProducts } from '../../../store/actions';

const CategoryProducts = props => {
    const category_id = props.match.params.category_id;
    const { products, getProducts } = props;

    useEffect(() => {
        if (!products) {
            getProducts(category_id);
        }
    }, [category_id]);

    return <CategoryProductsComponent {...props} category_id={category_id} />;
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
