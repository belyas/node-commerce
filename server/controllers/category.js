export default class Category {
    static index (req, res) {
        res.render('categories/index', {
            title: 'Categories',
            currentPath: req.baseUrl
        });
    }

    static addCategory (req, res) {
        res.render('categories/add', {
            title: 'Add category',
            currentPath: req.baseUrl
        });
    }
}
