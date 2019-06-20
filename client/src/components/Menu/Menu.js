import React from 'react';
import { NavLink } from 'react-router-dom';
import { Spinner } from 'reactstrap';

const Menu = ({ loading, categories }) => {
    return (
        <div className="navbar navbar-expand-md navbar-light bg-light justify-content-center">
            <ul className="nav">
                {loading && <Spinner size="sm" color="primary" />}
                {categories.length > 0 &&
                    categories.map(category => {
                        return (
                            <li className="nav-item" key={category._id}>
                                <NavLink
                                    className="nav-link"
                                    to={`/category/${category._id}`}>
                                    {' '}
                                    {category.name}
                                </NavLink>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default Menu;
