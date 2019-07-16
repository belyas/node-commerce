import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { authLoggedout } from '../../store/actions';

const Logout = ({ authLoggedout }) => {
    useEffect(() => {
        authLoggedout();
        // eslint-disable-next-line
    }, []);

    return <Redirect to="/" />;
};

Logout.propTypes = {
    authLoggedout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ authLoggedout }, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(Logout);
