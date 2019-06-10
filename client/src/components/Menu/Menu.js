import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import axios from '../../axios';

const Menu = props => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get('/categories')
            .then(res => res.data)
            .then(res => {
                setCategories(res.data);
            })
            .catch(console.log);
    }, []);

    return (
        <div className="navbar navbar-expand-md navbar-light bg-light justify-content-center">
            <ul className="nav">
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
