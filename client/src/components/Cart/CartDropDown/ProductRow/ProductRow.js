import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';

import classes from './ProductRow.module.css';

const ProductRow = ({ product, handleRemove }) => {
    const removeItemFromCart = useCallback(() => handleRemove(product), [
        handleRemove,
        product,
    ]);
    return (
        <div className={classes.ProductRow}>
            <img
                src={product.image}
                className={classes.ProductRowImg}
                alt={product.name}
            />
            <div className={classes.ProductRowMain}>
                <h5 className={classes.ProductRowName}>{product.name}</h5>
                <span className={classes.ProductRowPrice}>
                    ${product.price}
                </span>{' '}
                X {product.qty}
            </div>
            <span
                className={classes.ProductRowRemoveBtn}
                onClick={removeItemFromCart}>
                <i className="fa fa-trash" aria-hidden="true"></i>
            </span>
        </div>
    );
};

ProductRow.propTypes = {
    product: PropTypes.object.isRequired,
    handleRemove: PropTypes.func.isRequired,
};

export default memo(ProductRow);
