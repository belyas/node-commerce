import mongoose from 'mongoose';

import ProductModel from '../../models/product';
import { productsPresenter, productPresenter } from '../../utils/presenter';

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
            const { categoryId } = req.params;
            const products = await ProductModel.find({
                category: categoryId,
            }).sort([['createdAt', -1]]);
            const updatedProducts = productsPresenter(products);

            res.status(200).json({ data: updatedProducts });
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    }

    static async getProductId(req, res) {
        try {
            const { productId } = req.params;
            const _id = mongoose.Types.ObjectId(productId);
            const product = await ProductModel.findById(_id);
            const updatedProduct = productPresenter(product);

            res.status(200).json(updatedProduct);
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    }
}
