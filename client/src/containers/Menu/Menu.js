import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { fetchCategories } from '../../store/actions';
import MenuComponent from '../../components/Menu/Menu';

const Menu = ({ fetchCategories, loading, categories }) => {
    useEffect(() => {
        fetchCategories();
        // eslint-disable-next-line
    }, []);

    const props = { loading, categories };
    return <MenuComponent {...props} />;
};

Menu.propTypes = {
    loading: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    fetchCategories: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        categories: state.category.categories,
        loading: state.category.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchCategories }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);
