import React from 'react';
import PropTypes from 'prop-types';

import { concatClasses } from '../../../utils/helpers';
import classes from './CartMenu.module.css';

const CartMenu = ({ cart }) => {
    return (
        <div
            className={concatClasses('nav-link', classes.headerCart)}
            to="/cart">
            <span className={classes.cartTotlaItems}>{cart.totalItems}</span>
            <i
                className={concatClasses(
                    'fa',
                    'fa-shopping-cart ',
                    classes.cartIcon
                )}></i>
        </div>
    );
};

CartMenu.propTypes = {
    cart: PropTypes.object.isRequired,
};

export default CartMenu;
