import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = props => {
    return (
        <header>
            <div className="navbar navbar-expand-md navbar-dark bg-dark">
                <NavLink className="navbar-brand" to="/">
                    Node commerce
                </NavLink>

                <ul className="nav ml-auto navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">
                            Login
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/signup">
                            Signup
                        </NavLink>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
