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

const updateCart = (items, product) => {
    const itemIndex = items.findIndex(
        item => item._id && item._id === product._id
    );
    let updatedItems;

    // product already in items, then we update its quantity
    if (itemIndex > -1) {
        updatedItems = [...items];
        let item = updatedItems[itemIndex];
        item = {
            ...item,
            qty: item.qty + product.qty,
        };
        updatedItems[itemIndex] = item;
    } else {
        // add new product to items
        updatedItems = items.concat(product);
    }

    return updatedItems;
};

const getCartTotalPrice = items => {
    return items.reduce((acc, item) => (acc += item.price * item.qty), 0);
};

const getCartTotalItems = items => {
    return items.reduce((acc, item) => (acc += item.qty), 0);
};

export {
    concatClasses,
    updateObject,
    updateCart,
    getCartTotalPrice,
    getCartTotalItems,
};
