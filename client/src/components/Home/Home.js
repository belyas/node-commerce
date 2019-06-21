import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Spinner } from 'reactstrap';

import Product from '../Product/ProductCard/ProductCard';
import { getProducts } from '../../store/actions';

class Home extends Component {
    componentDidMount() {
        if (!this.props.products.length) {
            this.props.getProducts();
        }
    }

    render() {
        const { loading, products } = this.props;
        return (
            <Row id="products-list">
                {loading && <Spinner color="primary" />}
                {products &&
                    products.map(product => {
                        return (
                            <Product
                                key={product._id}
                                product={product}
                                size="4"
                            />
                        );
                    })}
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.product.loading,
        products: state.product.products,
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ getProducts }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
