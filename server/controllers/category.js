export default class Category {
    static index (req, res, next) {
        res.render('categories/index', {
            title: 'Categories',
            currentPath: req.baseUrl
        });
    }
}
