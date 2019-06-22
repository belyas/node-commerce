import React from 'react';
import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Col,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductCard = ({ size, product }) => {
    let getCardSize = size || 4;

    return (
        <Col sm={getCardSize}>
            <Card>
                <Link to={`/product/${product._id}`}>
                    <CardImg
                        top
                        width="100%"
                        src={product.image}
                        alt={product.name}
                    />
                </Link>
                <CardBody>
                    <CardTitle>{product.name}</CardTitle>
                    <CardSubtitle>${product.price}</CardSubtitle>
                    <Button>Add to cart</Button>
                </CardBody>
            </Card>
        </Col>
    );
};

ProductCard.propTypes = {
    size: PropTypes.number,
    product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
    }),
};

export default ProductCard;
