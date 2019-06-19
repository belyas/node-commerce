import React from 'react';
import { Spinner, Button } from 'reactstrap';

const ProductDetail = ({ product, product_id, loading }) => {
    return (
        <div>
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
                            <Button color="info"> Add to cart</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
