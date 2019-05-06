import CategoryModel from '../models/category';

const CATEGORY_ROUTE_MAIN = 'categories';
const CATEGORY_ROUTE_INDEX = CATEGORY_ROUTE_MAIN + '/index';
const CATEGORY_ROUTE_ADD = CATEGORY_ROUTE_MAIN + '/add';

export default class Category {
    static index (req, res) {
        res.render(CATEGORY_ROUTE_INDEX, {
            title: 'Categories',
            currentPath: req.baseUrl
        });
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
                return res.redirect('/');
            }

            req.flash('error', 'Category could not be added!');
            res.redirect(CATEGORY_ROUTE_ADD);
        } catch (error) {
            req.flash('error', error.message);
            res.redirect(CATEGORY_ROUTE_ADD);
        }
    }
}
