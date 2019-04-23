
exports.index  = (req, res, next) => {
    res.render('default', {
        title: 'Node commerce',
        message: 'Welcome to Node Commerce project :)'
    });
};
