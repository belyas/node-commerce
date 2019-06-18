import React from 'react';
import { Spinner } from 'reactstrap';

const ProductDetail = ({ product, product_id, loading }) => {
    return (
        <div>
            {loading && <Spinner color="primary" />}
            {!loading && (
                <>
                    Product detail of component: {product_id}{' '}
                    {product && product.name}{' '}
                </>
            )}
        </div>
    );
};

export default ProductDetail;
