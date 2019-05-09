import he from 'he';

const ltrim = (str, op = '/') => {
    const pattern = op ? new RegExp(`^[${op}]+`, 'g') : /^\s+/g;

    return str.replace(pattern, '');
};

const capitalize = str => str.substr(0, 1).toUpperCase() + str.substr(1);
const decodeStr  = str => he.decode(str);

export { ltrim, capitalize, decodeStr };
