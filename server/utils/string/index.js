const ltrim = (str, op = '/') => {
    return str.substring(str.indexOf(op) + 1);
};

export {
    ltrim
};
