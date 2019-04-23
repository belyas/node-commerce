exports.index = (req, res) => {
    res.render('categories/index', {
        title: 'Categories'
    });
}