import React from 'react';
import { Spinner } from 'reactstrap';
import PropTypes from 'prop-types';

import Product from '../ProductCard/ProductCard';
import classes from '../Product.module.css';

const CategoryProducts = ({ products, loading }) => {
    return (
        <div className={classes.products__list}>
            {loading && <Spinner color="primary" />}
            {products &&
                products.map(product => {
                    return <Product key={product._id} product={product} />;
                })}
        </div>
    );
};

CategoryProducts.propTypes = {
    loading: PropTypes.bool.isRequired,
    products: PropTypes.array.isRequired,
};

export default CategoryProducts;
