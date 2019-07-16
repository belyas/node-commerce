const {
    productPresenter,
    productsPresenter,
} = require('../../../utils/presenter');

describe('Product presenter Util', () => {
    const product = {
        image: 'some_image_url',
        name: 'Product 1',
        description: 'some desc',
        price: 23,
        _id: 'fn283902323n1391u313',
        quantity: 5,
        category: '12dweej9313238232',
    };
    const products = [product, product, product];
    const updatedProduct = productPresenter(product);

    it('should have diffent returned object', () => {
        expect(product).not.toBe(updatedProduct);
    });

    it('should have some properties', () => {
        expect(updatedProduct).toHaveProperty('_id');
        expect(updatedProduct).toHaveProperty('name', 'Product 1');
        expect(updatedProduct).toHaveProperty('image');
        expect(updatedProduct).toHaveProperty('description');
        expect(updatedProduct).toHaveProperty('price', 23);
        expect(updatedProduct).toHaveProperty('quantity', 5);
        expect(updatedProduct).not.toHaveProperty('id');
    });

    it('should return exact products (integration test)', () => {
        const updatedProducts = productsPresenter(products);

        expect(updatedProducts).toHaveLength(3);
        expect(updatedProducts[0]).toEqual(updatedProduct);
    });
});
