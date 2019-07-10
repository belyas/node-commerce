const { ltrim, capitalize, decodeStr, pipe } = require('../../../utils/string');

describe('String util', () => {
    it('should left trim string', () => {
        const myStr = '  some string';

        expect(ltrim(myStr, false)).toEqual('some string');
    });

    it('should capitalize a word', () => {
        const myStr = 'somestring';

        expect(capitalize(myStr)).toEqual('Somestring');
    });

    it('should decode string', () => {
        const myStr = 'code &amp; keep calm';

        expect(decodeStr(myStr)).toEqual('code & keep calm');
    });

    it('should pipe some functions', () => {
        const myStr = 'code &amp; keep calm';

        expect(
            pipe(
                decodeStr,
                capitalize
            )(myStr)
        ).toEqual('Code & keep calm');
    });
});
