import React from 'react';
import PropTypes from 'prop-types';

import Product from '../ProductCard/ProductCard';
import withSpinner from '../../../hoc/WithSpinner/WithSpinner';

import classes from '../Product.module.css';

const CategoryProducts = ({ products = [] }) => {
    return (
        <div className={classes.products__list}>
            {!!products.length &&
                products.map(product => {
                    return <Product key={product._id} product={product} />;
                })}
        </div>
    );
};

CategoryProducts.propTypes = {
    loading: PropTypes.bool,
    products: PropTypes.array.isRequired,
};

export default withSpinner(CategoryProducts);
