import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = props => {
    let displayLogin = true;

    if (props.isAuthenticated) {
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

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

export default connect(mapStateToProps)(Header);
