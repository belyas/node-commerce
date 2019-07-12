import React from 'react';
import PropTypes from 'prop-types';

import classes from './CartRow.module.css';

const CartRow = ({ item: { image, name, _id, price, qty } }) => (
    <div className={classes.CartRow}>
        <div className={classes.CartRowItem}>
            <img src={image} alt={name} />
        </div>
        <div className={classes.CartRowItem}>{name}</div>
        <div className={classes.CartRowItem}>${price}</div>
        <div className={classes.CartRowItem}>{qty}</div>
        <div className={classes.CartRowItem}>${price * qty}</div>
    </div>
);

CartRow.propTypes = {
    item: PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        qty: PropTypes.number.isRequired,
    }).isRequired,
};

export default CartRow;
