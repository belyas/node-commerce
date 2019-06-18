import React from 'react';
import { Row, Spinner } from 'reactstrap';
import Product from '../Product/ProductCard';

const categoryProducts = ({ products, loading, category_id }) => {
    return (
        <Row>
            {loading && <Spinner color="primary" />}
            {products[category_id] &&
                products[category_id].map(product => {
                    return (
                        <Product key={product._id} product={product} size="4" />
                    );
                })}
        </Row>
    );
};

export default categoryProducts;
