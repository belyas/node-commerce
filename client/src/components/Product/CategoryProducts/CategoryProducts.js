import React from 'react';
import { Row, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';

import Product from '../ProductCard/ProductCard';

const CategoryProducts = ({ products, loading }) => {
    return (
        <Row id="products-list">
            {loading && <Spinner color="primary" />}
            {products &&
                products.map(product => {
                    return (
                        <Product key={product._id} product={product} size="4" />
                    );
                })}
        </Row>
    );
};

CategoryProducts.propTypes = {
    loading: PropTypes.bool.isRequired,
    products: PropTypes.array.isRequired,
};

export default CategoryProducts;
