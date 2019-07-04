import { setAuthToken } from '../../utils/api';

describe('Api helper', () => {
    let client;

    beforeEach(() => {
        client = {
            defaults: {
                headers: {
                    common: {
                        Authorization: null,
                    },
                },
            },
        };
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should contains Authorization header with a bearer token', () => {
        localStorage.setItem('token', '123456');

        const client = {
            defaults: {
                headers: {
                    common: {
                        Authorization: null,
                    },
                },
            },
        };
        const response = setAuthToken(client);
        const savedToen = localStorage.getItem('token');

        expect(response.defaults.headers.common['Authorization']).toEqual(
            'Bearer ' + savedToen
        );
    });

    it('does not contain Authorization header', () => {
        const response = setAuthToken(client);

        expect(
            response.defaults.headers.common['Authorization']
        ).toBeUndefined();
    });
});
