import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner } from 'reactstrap';

import * as actions from '../../store/actions';

const Menu = ({ loading, categories, fetchCategoriesAction }) => {
    useEffect(() => {
        fetchCategoriesAction();
    }, []);

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

const mapStateToProps = state => {
    return {
        categories: state.category.categories,
        loading: state.category.loading,
    };
};

const mapDispatchToProps = dispatch => {
    const fetchCategoriesAction = actions.fetchCategories;
    return bindActionCreators({ fetchCategoriesAction }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);
