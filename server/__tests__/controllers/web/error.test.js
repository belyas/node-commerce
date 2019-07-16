const fetch = require('node-fetch');

const HOME_URL = 'http://localhost:8000/notexstingroute';

describe('Testing error page', () => {
    it('should have h1 with error text', () => {
        expect.assertions(1);

        return fetch(HOME_URL)
            .then(resp => resp.text())
            .then(html => {
                document.body.innerHTML = html;
                const welcomeText = 'Page Not Found!';
                const h1 = document.querySelector('h1');

                expect(h1.textContent).toEqual(welcomeText);
            })
            .catch(err => console.log('Catched Error: ', err.message));
    });
});
