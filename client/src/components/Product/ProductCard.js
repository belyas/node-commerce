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

const ProductCard = ({ size, product }) => {
    let getCardSize = size || 4;

    return (
        <Col sm={getCardSize}>
            <Card>
                <CardImg
                    top
                    width="100%"
                    src={product.image}
                    alt={product.name}
                />
                <CardBody>
                    <CardTitle>{product.name}</CardTitle>
                    <CardSubtitle>${product.price}</CardSubtitle>
                    <Button>Add to cart</Button>
                </CardBody>
            </Card>
        </Col>
    );
};

export default ProductCard;
