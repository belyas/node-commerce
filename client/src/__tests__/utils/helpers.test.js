import { concatClasses, updateObject } from '../../utils/helpers';

describe('Helprs utils', () => {
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
});
