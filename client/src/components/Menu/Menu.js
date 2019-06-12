import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';

import { fetchCategories } from '../../store/actions';

class Menu extends PureComponent {
    componentDidMount() {
        this.props.fetchCategories();
    }
    render() {
        const { loading, categories } = this.props;
        return (
            <div className="navbar navbar-expand-md navbar-light bg-light justify-content-center">
                <ul className="nav">
                    {loading && <Spinner size="sm" color="primary" />}
                    {categories &&
                        categories.length > 0 &&
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
    }
}

const mapStateToProps = state => {
    return {
        categories: state.category.categories,
        loading: state.category.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);
