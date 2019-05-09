import fs from 'fs';
import path from 'path';
import ProductModel from '../models/product';

const PRODUCT_ROUTE_MAIN = 'products';
const PRODUCT_ROUTE_LIST = PRODUCT_ROUTE_MAIN + '/list';
const PRODUCT_ROUTE_ADD = PRODUCT_ROUTE_MAIN + '/add';
const PRODUCT_ROUTE_EDIT = PRODUCT_ROUTE_MAIN + '/edit';

export default class Product {
    static async list (req, res) {
        try {
            const products = await ProductModel.find({}).sort([['createdAt', -1]]);

            res.render(PRODUCT_ROUTE_LIST, {
                title: 'Products list',
                currentPath: req.baseUrl,
                products
            });
        } catch (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
    }

    static add (req, res) {
        res.render(PRODUCT_ROUTE_ADD, {
            title: 'Add a product',
            currentPath: req.baseUrl
        });
    }

    static async store (req, res) {
        const { name, descritpion, price, quantity } = req.body;
        const image = req.file;
        let hasError = false;

        if (!image) {
            req.flash('error', 'Attached file is not an image.');
            hasError = true;
        }

        if (!name.trim()) {
            req.flash('error', 'Product\'s name is mandary.');
            hasError = true;
        }

        if (!descritpion.trim()) {
            req.flash('error', 'Product\'s description is mandary.');
            hasError = true;
        }

        if (!price) {
            req.flash('error', 'Product\'s price is mandary.');
            hasError = true;
        }

        if (!quantity) {
            req.flash('error', 'Product\'s quantity is mandary.');
            hasError = true;
        }

        // return to add page to display errors
        if (hasError) {
            return res.redirect('/' + PRODUCT_ROUTE_ADD);
        }

        try {
            const productObj = new ProductModel({
                name: name.trim().toLowerCase(),
                descritpion: descritpion.trim().toLowerCase(),
                price: +price,
                quantity: +quantity,
                image: image.filename
            });

            const savedProduct = await productObj.save();

            if (savedProduct) {
                req.flash('success', 'Product has been successfully added.');
                return res.redirect('/' + CATEGORY_ROUTE_MAIN);
            }

            req.flash('error', 'Product could not be added!');
            res.redirect('/' + PRODUCT_ROUTE_ADD);
        } catch (err) {
            req.flash('error', err);
            res.redirect('/' + PRODUCT_ROUTE_ADD);
        }
    }

    static async edit (req, res) {
        const productId = req.params.id;

        try {
            const product = await ProductModel.findById(productId);

            res.render(PRODUCT_ROUTE_EDIT, {
                title: 'Edit product',
                currentPath: req.baseUrl,
                product
            });
        } catch (err) {
            req.flash('error', err);
            res.redirect('/' + PRODUCT_ROUTE_MAIN);
        }
    }

    static async update (req, res) {
        const { id, name, descritpion, price, quantity } = req.body;
        const image = req.file;
        let hasError = false;

        if (!id) {
            req.flash('error', 'Prodct was not found.');
            return res.redirect('/' + PRODUCT_ROUTE_MAIN);
        }

        if (!name.trim()) {
            req.flash('error', 'Category name is mandary.');
            hasError = true;
        }

        if (!descritpion.trim()) {
            req.flash('error', 'Product\'s description is mandary.');
            hasError = true;
        }

        if (!price) {
            req.flash('error', 'Product\'s price is mandary.');
            hasError = true;
        }

        if (!quantity) {
            req.flash('error', 'Product\'s quantity is mandary.');
            hasError = true;
        }

        // return to edit page to display errors
        if (hasError) {
            return res.redirect('/' + PRODUCT_ROUTE_EDIT + '/' + id);
        }

        try {
            const product = await ProductModel.findById(id);
            const updatedProduct = {
                name: name.trim().toLowerCase(),
                description: description.trim().toLowerCase(),
                price: +price,
                quantity: +quantity
            };
            const oldImage = product.image;
            let hasImage = false;

            if (image) {
                updatedProduct.image = image.filename;
                hasImage = true;
            }

            const productUpdated = await ProductModel.updateOne({ _id: id }, { $set: updatedProduct });

            if (productUpdated.n) {
                // check if the image has been uploaded, then remove the old one
                if (hasImage) {
                    fs.unlinkSync(path.join(__dirname, '../public/images/products/') + oldImage);
                }

                req.flash('success', 'Product has been successfully updated.');
                return res.redirect('/' + PRODUCT_ROUTE_MAIN);
            }

            req.flash('error', 'Product has not been updated.');
            res.redirect('/' + PRODUCT_ROUTE_MAIN);
        } catch (err) {
            req.flash('error', err);
            res.redirect('/' + PRODUCT_ROUTE_EDIT + '/' + id);
        }
    }
}
