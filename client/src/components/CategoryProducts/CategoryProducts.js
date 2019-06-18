import React from 'react';
import { Row, Spinner } from 'reactstrap';
import Product from '../Product/ProductCard';

const categoryProducts = ({ products, loading, category_id }) => {
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

export default categoryProducts;
