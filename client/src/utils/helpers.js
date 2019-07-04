const concatClasses = (...classes) => {
    if (Array.isArray(classes[0])) {
        classes = classes[0];
    }

    return classes.join(' ');
};

const updateObject = (oldObject, newObjectProps) => {
    return {
        ...oldObject,
        ...newObjectProps,
    };
};

export { concatClasses, updateObject };
