import he from 'he';

/** Left trim the given pattern, otherwise any whitespace */
const ltrim = (str, op = '/') => {
    const pattern = op ? new RegExp(`^[${op}]+`, 'g') : /^\s+/g;

    return str.replace(pattern, '');
};

/** Capitalize the first letter of the given string */
const capitalize = str => str.substr(0, 1).toUpperCase() + str.substr(1);

/** Decode escaped html characters */
const decodeStr = str => he.decode(str);

/** Pipe the given functions */
const pipe = (...fns) => arg => fns.reduce((c, fn) => fn(c), arg);

export { ltrim, capitalize, decodeStr, pipe };
