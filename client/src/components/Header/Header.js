import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ isAuthenticated }) => {
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
                </ul>
            </div>
        </header>
    );
};

Header.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};

export default Header;
