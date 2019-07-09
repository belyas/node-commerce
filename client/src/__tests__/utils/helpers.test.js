import {
    concatClasses,
    updateObject,
    updateCart,
    getCartTotalPrice,
} from '../../utils/helpers';

describe('Helpers Utils', () => {
    it('should concatenate class names', () => {
        const classes = concatClasses('class1', 'class3', 'class2');

        expect(classes).toEqual('class1 class3 class2');
    });

    it('should return empty string', () => {
        const classes = concatClasses();

        expect(classes).toBe('');
    });

    it('should concatenate class names wiht array passed as argument', () => {
        const classes = concatClasses(['class1', 'class3', 'class2']);

        expect(classes).toEqual('class1 class3 class2');
    });

    it('should return merged object', () => {
        const newObj = { name: 'yassine belkaid', age: 31 };
        const mergedObject = updateObject({ name: 'yassine', age: 30 }, newObj);
        const emptyObject = updateObject({}, {});

        expect(mergedObject).toEqual(newObj);
        expect(emptyObject).toEqual({});
        expect(updateObject()).toEqual({});
    });

    it('should add/update products to the cart', () => {
        const product1 = { _id: 1, name: 'product1', price: 10, qty: 1 };
        const product2 = { _id: 2, name: 'product2', price: 20, qty: 2 };
        const updatedCartFirst = updateCart([], product1);
        const updatedCartSecond = updateCart([product1], product2);
        const updatedCartThird = updateCart([product1, product2], product2);

        expect(updatedCartFirst).toEqual([product1]);
        expect(updatedCartSecond).toEqual([product1, product2]);
        expect(updatedCartThird).not.toEqual([product1, product2]);
        expect(updatedCartThird[0].qty).toBe(1);
        expect(updatedCartThird[1].qty).toBe(4);

        expect(getCartTotalPrice(updatedCartThird)).toBe(90);
    });
});
