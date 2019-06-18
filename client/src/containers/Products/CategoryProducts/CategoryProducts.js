import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import CategoryProductsComponent from '../../../components/CategoryProducts/CategoryProducts';
import { getCategoryProducts } from '../../../store/actions';

const CategoryProducts = props => {
    const category_id = props.match.params.category_id;
    const { products, getProducts } = props;

    useEffect(() => {
        if (!products[category_id]) {
            getProducts(category_id);
        }
    }, [category_id]);

    return <CategoryProductsComponent {...props} category_id={category_id} />;
};

const mapStateToProps = state => {
    return {
        products: state.product.category_products,
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
