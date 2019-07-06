import React from 'react';
import { Spinner } from 'reactstrap';
import PropTypes from 'prop-types';

import Product from '../Product/ProductCard/ProductCard';
import classes from '../Product/Product.module.css';

const Home = ({ loading, products }) => {
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

Home.propTypes = {
    loading: PropTypes.bool.isRequired,
    products: PropTypes.array.isRequired,
};

export default Home;
