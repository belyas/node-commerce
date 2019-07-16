import { connect } from 'react-redux';

import Header from '../../components/Header/Header';

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

export default connect(mapStateToProps)(Header);
