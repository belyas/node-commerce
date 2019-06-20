import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../store/actions';
import MenuComponent from '../../components/Menu/Menu';

const Menu = props => {
    useEffect(() => {
        props.fetchCategoriesAction();
        // eslint-disable-next-line
    }, []);

    return <MenuComponent {...props} />;
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
