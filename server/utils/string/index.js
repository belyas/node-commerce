const ltrim = function(str, op = '/') {
    str.substring(str.indexOf(op) + 1);
};

export {
    ltrim
};
