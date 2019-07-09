import React from 'react';
import { Spinner, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addToCart } from '../../../store/actions';

const ProductDetail = ({ product, loading, setCartItem }) => {
    return (
        <>
            {loading && <Spinner color="primary" />}
            {!loading && product && (
                <div id="product-details" className="col-md-12">
                    <div className="col-md-6 col-sm-12">
                        <img
                            src={product.image}
                            className="img-responsive"
                            alt={product.name}
                        />
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <h4>{product.name}</h4>
                        {product.quantity && (
                            <p className="product-available">Available</p>
                        )}
                        <p className="product-desc">{product.description}</p>
                        <p className="product-price">${product.price}</p>
                        <div id="add-to-cart">
                            <Button
                                color="info"
                                onClick={() => setCartItem(product)}>
                                {' '}
                                Add to cart
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

ProductDetail.propTypes = {
    loading: PropTypes.bool.isRequired,
    product: PropTypes.shape({
        name: PropTypes.string,
        image: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        quantity: PropTypes.number,
    }).isRequired,
    setCartItem: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
    return {
        setCartItem: product => {
            product.qty = 1; // hack qty for now
            dispatch(addToCart(product));
        },
    };
};

export default connect(
    null,
    mapDispatchToProps
)(ProductDetail);
