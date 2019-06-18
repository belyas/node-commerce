const productsPresenter = products => {
    const updatedProducts = products.map(product => {
        return productPresenter(product);
    });

    return updatedProducts;
};

const productPresenter = product => {
    const base_url = process.env.BASE_URL;
    const updatedProduct = {};
    updatedProduct.image = `${base_url}/images/products/${product.image}`;
    updatedProduct.name = product.name;
    updatedProduct.description = product.description;
    updatedProduct.price = product.price;
    updatedProduct.price = product.price;
    updatedProduct._id = product._id;
    updatedProduct.quantity = product.quantity;
    updatedProduct.category = product.category;

    return updatedProduct;
};

export { productsPresenter, productPresenter };
