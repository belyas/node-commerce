export default class Category {
    static index (req, res) {
        res.render('categories/index', {
            title: 'Categories',
            currentPath: req.baseUrl
        });
    }
}
