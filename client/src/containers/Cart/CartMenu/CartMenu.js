import { connect } from 'react-redux';

import CartMenuComponent from '../../../components/Cart/CartMenu/CartMenu';

const mapStateToProps = state => ({
    cart: state.cart,
});

export default connect(mapStateToProps)(CartMenuComponent);
