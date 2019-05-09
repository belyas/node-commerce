const ltrim = (str, op = '/') => {
    const pattern = op ? new RegExp(`^[${op}]+`, 'g') : /^\s+/g;

    return str.replace(pattern, '');
};

export {
    ltrim
};
