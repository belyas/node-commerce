const fetch = require('node-fetch');

const HOME_URL = 'http://localhost:8000';

describe('Testing homne page', () => {
    it('should have h1 with welcome text', () => {
        expect.assertions(1);

        return fetch(HOME_URL)
            .then(resp => resp.text())
            .then(html => {
                document.body.innerHTML = html;
                const welcomeText = 'Welcome to Node Commerce project :)';
                const h1 = document.querySelector('h1');

                expect(h1.textContent).toEqual(welcomeText);
            })
            .catch(err => console.log('Catched Error: ', err.message));
    });
});
