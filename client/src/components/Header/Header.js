import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { concatClasses } from '../../utils/helpers';
import classes from './Header.module.css';

const Header = ({ isAuthenticated, cart }) => {
    return (
        <header>
            <div className="navbar navbar-expand-md navbar-dark bg-dark">
                <NavLink className="navbar-brand" to="/">
                    Node commerce
                </NavLink>

                <ul className="nav ml-auto navbar-nav">
                    {!isAuthenticated && (
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">
                                Login
                            </NavLink>
                        </li>
                    )}
                    {isAuthenticated && (
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/logout">
                                Logout
                            </NavLink>
                        </li>
                    )}
                    <li className="nav-item">
                        <NavLink
                            className={concatClasses(
                                'nav-link',
                                classes.headerCart
                            )}
                            to="/cart">
                            <span className={classes.cartTotlaItems}>
                                {cart.totalItems}
                            </span>
                            <i
                                className={concatClasses(
                                    'fa',
                                    'fa-shopping-cart ',
                                    classes.cartIcon
                                )}></i>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </header>
    );
};

Header.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    cart: PropTypes.object.isRequired,
};

export default Header;
