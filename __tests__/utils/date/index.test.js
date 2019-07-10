const { formatStringDate } = require('../../../utils/date');

describe('Date Util', () => {
    it('should return false if no date provided', () => {
        const emptyDate = formatStringDate();

        expect(emptyDate).toBeFalsy();
    });

    it('should return false if not a valid date', () => {
        const notValidDate = formatStringDate('something');

        expect(notValidDate).toBeFalsy();
    });

    it('should return a valid date', () => {
        const validDate = formatStringDate('Tue Jun 25 2019');

        expect(validDate).toEqual('25/06/2019');
    });
});
