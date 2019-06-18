const productsPresenter = products => {
    const base_url = process.env.BASE_URL;
    const updatedProducts = products.map(product => {
        product.image = `${base_url}/images/products/${product.image}`;
        return product;
    });

    return updatedProducts;
};

export { productsPresenter };
