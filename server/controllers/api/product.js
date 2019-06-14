import ProductModel from '../../models/product';

export default class Product {
    static async all(req, res) {
        try {
            const products = await ProductModel.find({}).sort([
                ['createdAt', -1],
            ]);
            const base_url = process.env.BASE_URL;
            const updatedProducts = products.map(product => {
                product.image = `${base_url}/images/products/${product.image}`;
                return product;
            });

            res.status(200).json({ data: updatedProducts });
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    }
}
