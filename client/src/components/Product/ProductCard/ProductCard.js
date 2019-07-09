import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from '../Product.module.css';
import { addToCart } from '../../../store/actions';

const ProductCard = ({ product, setCartItem }) => {
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
            <span
                className={classes.ProductRowBtn}
                onClick={() => setCartItem(product)}>
                Add to cart
            </span>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
    }),
    setCartItem: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
    return {
        setCartItem: product => {
            product.qty = 1; // hack qty for now
            dispatch(addToCart(product));
        },
    };
};

export default connect(
    null,
    mapDispatchToProps
)(ProductCard);
