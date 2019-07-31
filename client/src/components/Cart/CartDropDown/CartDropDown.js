import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { removeFromCart } from '../../../store/actions/cart';
import ProductRow from './ProductRow/ProductRow';
import classes from './CartDropDown.module.css';

const CartDropDown = ({ open, products, totalPrice, onToggleDropDown }) => {
    const dispatch = useDispatch();
    const removeItemFromCart = useCallback(
        product => dispatch(removeFromCart(product)),
        [dispatch]
    );
    let displayedContent = <p className={classes.EmptyCart}>Empty cart!</p>;

    if (open && products.length > 0) {
        displayedContent = (
            <>
                <div className={classes.ProductTotalPrice}>
                    <b>Total price:</b>{' '}
                    <span className={classes.Price}>${totalPrice}</span>
                </div>
                <Link
                    to="/cart"
                    className={classes.CheckoutBtn}
                    onClick={onToggleDropDown}>
                    Checkout
                </Link>
            </>
        );
    }

    return (
        open && (
            <div className={classes.DropDown}>
                {products.length > 0 &&
                    products.map(product => (
                        <ProductRow
                            key={product._id}
                            product={product}
                            handleRemove={removeItemFromCart}
                        />
                    ))}
                {displayedContent}
            </div>
        )
    );
};

CartDropDown.propTypes = {
    products: PropTypes.array,
    open: PropTypes.bool.isRequired,
    totalPrice: PropTypes.number.isRequired,
};

export default CartDropDown;
