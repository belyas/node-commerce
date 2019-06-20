import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ isAuthenticated }) => {
    let displayLogin = true;

    if (isAuthenticated) {
        displayLogin = false;
    }

    return (
        <header>
            <div className="navbar navbar-expand-md navbar-dark bg-dark">
                <NavLink className="navbar-brand" to="/">
                    Node commerce
                </NavLink>

                <ul className="nav ml-auto navbar-nav">
                    {displayLogin && (
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">
                                Login
                            </NavLink>
                        </li>
                    )}
                    {!displayLogin && (
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

export default Header;
