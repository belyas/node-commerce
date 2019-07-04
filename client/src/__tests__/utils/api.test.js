import { setAuthToken } from '../../utils/api';

describe('Api helper', () => {
    beforeEach(() => {
        // values stored in tests will also be available in other tests unless you run
        // localStorage.clear();
        // // or directly reset the storage
        // localStorage.__STORE__ = {};
        // // or individually reset a mock used
        // localStorage.setItem.mockClear();
    });
    it('should contains Authorization header with a bearer token', () => {
        // localStorage.setItem('token', '123456');
        console.log(Object.keys(localStorage));
        const client = {
            defaults: {
                headers: {
                    common: {
                        Authorization: 'Bearer',
                    },
                },
            },
        };
        const getToken = setAuthToken(client);

        // expect(localStorage.__STORE__['token']).toBe('123456');
    });
});
