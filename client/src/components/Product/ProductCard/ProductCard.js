import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from '../Product.module.css';

const ProductCard = ({ product }) => {
    return (
        <div className={classes.ProductRow}>
            <img
                src={product.image}
                alt={product.name}
                className={classes.ProductRowImg}
            />

            <div className={classes.ProductRowBottom}>
                <Link
                    to={`/product/${product._id}`}
                    className={classes.truncate}>
                    <span>{product.name}</span>
                </Link>
                <span>${product.price}</span>
            </div>
            <span className={classes.ProductRowBtn}>Add to cart</span>
        </div>
    );
};

ProductCard.propTypes = {
    size: PropTypes.number,
    product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
    }),
};

export default ProductCard;
