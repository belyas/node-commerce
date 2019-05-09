import fs from 'fs';
import path from 'path';
import CategoryModel from '../models/category';
import { ltrim } from '../utils/string';

const CATEGORY_ROUTE_MAIN = 'categories';
const CATEGORY_ROUTE_MAIN_URL = '/' + CATEGORY_ROUTE_MAIN;
const CATEGORY_ROUTE_LIST = CATEGORY_ROUTE_MAIN_URL + '/list';
const CATEGORY_ROUTE_ADD = CATEGORY_ROUTE_MAIN_URL + '/add';
const CATEGORY_ROUTE_EDIT = CATEGORY_ROUTE_MAIN_URL + '/edit';

export default class Category {
    static async list (req, res) {
        try {
            const categories = await CategoryModel.find({}).sort([['createdAt', -1]]);

            res.render(ltrim(CATEGORY_ROUTE_LIST), {
                title: 'Categories',
                currentPath: req.baseUrl,
                categories
            });
        } catch (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
    }

    static add (req, res) {
        res.render(ltrim(CATEGORY_ROUTE_ADD), {
            title: 'Add category',
            currentPath: req.baseUrl
        });
    }

    static async store (req, res) {
        const { name } = req.body;
        const image = req.file;
        let hasError = false;

        if (!image) {
            req.flash('error', 'Attached file is not an image.');
            hasError = true;
        }

        if (!name.trim()) {
            req.flash('error', 'Category name is mandatory.');
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
                return res.redirect(CATEGORY_ROUTE_MAIN_URL);
            }

            req.flash('error', 'Category could not be added!');
            res.redirect(CATEGORY_ROUTE_ADD);
        } catch (err) {
            req.flash('error', err);
            res.redirect(CATEGORY_ROUTE_ADD);
        }
    }

    static async edit (req, res) {
        const categoryId = req.params.id;

        try {
            const category = await CategoryModel.findById(categoryId);

            res.render(ltrim(CATEGORY_ROUTE_EDIT), {
                title: 'Edit category',
                currentPath: req.baseUrl,
                category
            });
        } catch (err) {
            req.flash('error', err);
            res.redirect(CATEGORY_ROUTE_MAIN_URL);
        }
    }

    static async update (req, res) {
        const { id, name } = req.body;
        const image = req.file;

        if (!id) {
            req.flash('error', 'Category was not found.');
            return res.redirect(CATEGORY_ROUTE_MAIN_URL);
        }

        if (!name.trim()) {
            req.flash('error', 'Category name is mandatory.');
            return res.redirect(CATEGORY_ROUTE_EDIT + '/' + id);
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
                return res.redirect(CATEGORY_ROUTE_MAIN_URL);
            }

            req.flash('error', 'Category has not been updated.');
            return res.redirect(CATEGORY_ROUTE_MAIN_URL);
        } catch (err) {
            req.flash('error', err);
            res.redirect(CATEGORY_ROUTE_EDIT + '/' + id);
        }
    }

    static async delete (req, res) {
        const { id } = req.body;

        if (!id) {
            req.flash('error', 'Category not found!');
            res.redirect(CATEGORY_ROUTE_MAIN_URL);
        }

        try {
            await CategoryModel.findByIdAndDelete(id);

            req.flash('success', 'Category has been successfully deleted.');
            res.redirect(CATEGORY_ROUTE_MAIN_URL);
        } catch (err) {
            req.flash('error', err);
            res.redirect(CATEGORY_ROUTE_MAIN_URL);
        }
    }
}
