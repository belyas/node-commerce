import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CartComponent from '../../components/Cart/Cart';

const Cart = ({ cart }) => {
    return <CartComponent cart={cart} />;
};

Cart.propTypes = {
    cart: PropTypes.object.isRequired,
};

const mapStateToProps = ({ cart }) => ({ cart });

export default connect(mapStateToProps)(Cart);
