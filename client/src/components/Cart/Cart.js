import React from 'react';
import PropTypes from 'prop-types';

import CartRow from './CartRow/CartRow';
import classes from './Cart.module.css';

const Cart = ({ cart: { items, totalItems, totalPrice } }) => {
    return (
        <div className={classes.Cart}>
            <h1 className={classes.CartTitle}>Shopping Cart ({totalItems})</h1>

            <div className={classes.CartHeader}>
                <div className={classes.CartHeaderItem}>Image</div>
                <div className={classes.CartHeaderItem}>Name</div>
                <div className={classes.CartHeaderItem}>Unit Price</div>
                <div className={classes.CartHeaderItem}>Quantity</div>
                <div className={classes.CartHeaderItem}>Total</div>
            </div>
            {!!items.length &&
                items.map(item => <CartRow key={item._id} item={item} />)}
            <div className={classes.CartTotalPrice}>
                Totals: <span>${totalPrice}</span>
            </div>
        </div>
    );
};

Cart.propTypes = {
    cart: PropTypes.shape({
        items: PropTypes.array.isRequired,
        totalItems: PropTypes.number.isRequired,
        totalPrice: PropTypes.number.isRequired,
    }).isRequired,
};

export default Cart;
