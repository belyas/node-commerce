import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import Product from '../Product/ProductCard/ProductCard';
import withSpinner from '../../hoc/WithSpinner/WithSpinner';

import classes from '../Product/Product.module.css';

const Home = ({ products = [] }) => {
    return (
        <div className={classes.products__list}>
            {!!products.length &&
                products.map(product => {
                    return <Product key={product._id} product={product} />;
                })}
        </div>
    );
};

Home.propTypes = {
    loading: PropTypes.bool,
    products: PropTypes.array.isRequired,
};

export default compose(
    React.memo,
    withSpinner
)(Home);
