import ProductModel from '../../models/product';
import { productsPresenter } from '../../utils/presenter';

export default class Product {
    static async all(req, res) {
        try {
            const products = await ProductModel.find({}).sort([
                ['createdAt', -1],
            ]);
            const updatedProducts = productsPresenter(products);
            res.status(200).json({ data: updatedProducts });
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    }

    static async getProductsByCategoryId(req, res) {
        try {
            const { category_id } = req.params;
            const products = await ProductModel.find({
                category: category_id,
            }).sort([['createdAt', -1]]);
            const updatedProducts = productsPresenter(products);

            res.status(200).json({ data: updatedProducts });
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    }
}
