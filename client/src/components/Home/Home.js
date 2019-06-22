import React from 'react';
import { Row, Spinner } from 'reactstrap';

import Product from '../Product/ProductCard/ProductCard';

const Home = ({ loading, products }) => {
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

export default Home;
