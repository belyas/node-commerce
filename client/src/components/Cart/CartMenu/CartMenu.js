import React from 'react';
import PropTypes from 'prop-types';

import { concatClasses } from '../../../utils/helpers';
import CartDropDown from '../CartDropDown/CartDropDown';
import classes from './CartMenu.module.css';

const CartMenu = ({ cart, isOpen, toggleDropDown }) => {
    return (
        <div className={concatClasses('nav-link', classes.headerCart)}>
            <span className={classes.cartTotlaItems}>{cart.totalItems}</span>
            <i
                onClick={toggleDropDown}
                className={concatClasses(
                    'fa',
                    'fa-shopping-cart ',
                    classes.cartIcon
                )}></i>
            <CartDropDown
                products={cart.items}
                totalPrice={cart.totalPrice}
                open={isOpen}
            />
        </div>
    );
};

CartMenu.propTypes = {
    cart: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    toggleDropDown: PropTypes.func,
};

export default CartMenu;
