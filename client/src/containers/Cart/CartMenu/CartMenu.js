import React, { useState } from 'react';
import { connect } from 'react-redux';

import CartMenuComponent from '../../../components/Cart/CartMenu/CartMenu';

const CartMenu = props => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDropDown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <CartMenuComponent
            {...props}
            isOpen={isOpen}
            toggleDropDown={handleDropDown}
        />
    );
};

const mapStateToProps = state => ({
    cart: state.cart,
});

export default connect(mapStateToProps)(CartMenu);
