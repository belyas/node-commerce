import fs from 'fs';
import path from 'path';
import CategoryModel from '../models/category';

const CATEGORY_ROUTE_MAIN = 'categories';
const CATEGORY_ROUTE_INDEX = CATEGORY_ROUTE_MAIN + '/index';
const CATEGORY_ROUTE_ADD = CATEGORY_ROUTE_MAIN + '/add';
const CATEGORY_ROUTE_EDIT = CATEGORY_ROUTE_MAIN + '/edit';

export default class Category {
    static async index (req, res) {
        try {
            const categories = await CategoryModel.find({}).sort([['createdAt', -1]]);

            res.render(CATEGORY_ROUTE_INDEX, {
                title: 'Categories',
                currentPath: req.baseUrl,
                categories
            });
        } catch (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
    }

    static addCategory (req, res) {
        res.render(CATEGORY_ROUTE_ADD, {
            title: 'Add category',
            currentPath: req.baseUrl
        });
    }

    static async postCategory (req, res) {
        const { name } = req.body;
        const image = req.file;
        let hasError = false;

        if (!image) {
            req.flash('error', 'Attached file is not an image.');
            hasError = true;
        }

        if (!name.trim()) {
            req.flash('error', 'Category name is mandary.');
            hasError = true;
        }

        // return add page to display errors
        if (hasError) {
            return res.redirect(CATEGORY_ROUTE_ADD);
        }

        try {
            const categoryObj = new CategoryModel({
                name: name.trim().toLowerCase(),
                image: image.filename
            });

            const savedCategory = await categoryObj.save();

            if (savedCategory) {
                req.flash('success', 'Category has been successfully added.');
                return res.redirect('/' + CATEGORY_ROUTE_MAIN);
            }

            req.flash('error', 'Category could not be added!');
            res.redirect(CATEGORY_ROUTE_ADD);
        } catch (error) {
            req.flash('error', error);
            res.redirect(CATEGORY_ROUTE_ADD);
        }
    }
    
    static async editCategory (req, res) {
        const categoryId = req.params.id;

        try {
            const category = await CategoryModel.findById(categoryId);

            res.render(CATEGORY_ROUTE_EDIT, {
                title: 'Edit category',
                currentPath: req.baseUrl,
                category
            });
        } catch (error) {
            req.flash('error', error);
            res.redirect('/' + CATEGORY_ROUTE_MAIN);
        }
    }

    static async updateCategory (req, res) {
        const { id, name } = req.body;
        const image = req.file;

        if (!id) {
            req.flash('error', 'Category was not found.');
            return res.redirect('/' + CATEGORY_ROUTE_MAIN);
        }

        if (!name.trim()) {
            req.flash('error', 'Category name is mandary.');
            return res.redirect(CATEGORY_ROUTE_EDIT + '/'+ id);
        }

        try {
            const category = await CategoryModel.findById(id);
            const updatedCategory = { name: name.trim().toLowerCase() };
            const oldImage = category.image;
            let hasImage = false;

            if (image) {
                updatedCategory.image = image.filename;
                hasImage = true;
            }

            const updateCategory = await CategoryModel.updateOne({ _id: id }, { $set: updatedCategory });

            if (updateCategory.n) {
                // check if the image has been uploaded, then remove the old one
                if (hasImage) {
                    fs.unlinkSync(path.join(__dirname, '../public/images/categories/') + oldImage);
                }

                req.flash('success', 'Category has been successfully updated.');
                return res.redirect('/' + CATEGORY_ROUTE_MAIN);
            }

            req.flash('error', 'Category has not been updated.');
            return res.redirect('/' + CATEGORY_ROUTE_MAIN);
        } catch (error) {
            req.flash('error', error);
            res.redirect('/' + CATEGORY_ROUTE_EDIT + '/'+ id);
        }
    }
}
