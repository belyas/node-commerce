import React from 'react';
import { Row, Spinner } from 'reactstrap';
import Product from '../Product/ProductCard';

const categoryProducts = ({ products, loading, category_id }) => {
    const getProducts = products[category_id];
    return (
        <Row id="products-list">
            {loading && <Spinner color="primary" />}
            {getProducts &&
                getProducts.map(product => {
                    return (
                        <Product key={product._id} product={product} size="4" />
                    );
                })}
        </Row>
    );
};

export default categoryProducts;
