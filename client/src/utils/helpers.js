const concatClasses = (...classes) => {
    return classes.join(' ');
};

const updateObject = (oldObject, newObjectProps) => {
    return {
        ...oldObject,
        ...newObjectProps,
    };
};

export { concatClasses, updateObject };
