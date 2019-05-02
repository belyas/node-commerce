(function () {
    const signUpSwitch = document.querySelector('.switch-signup');
    const signInSwitch = document.querySelector('.switch-signin');
    const errMessages = document.querySelector('.err-message');

    signUpSwitch.addEventListener('click', e => {
        e.preventDefault();

        switchSigninForm(true);
    });

    signInSwitch.addEventListener('click', e => {
        e.preventDefault();

        switchSigninForm();
    });

    function switchSigninForm (isSignup = false) {
        if (errMessages) {
            errMessages.innerHTML = '';
        }

        if (isSignup) {
            document.querySelector('#login-form').style.display = 'none';
            document.querySelector('#signup-form').style.display = 'block';
            signUpSwitch.style.display = 'none';
            signInSwitch.style.display = 'block';
        } else {
            document.querySelector('#login-form').style.display = 'block';
            document.querySelector('#signup-form').style.display = 'none';
            signUpSwitch.style.display = 'block';
            signInSwitch.style.display = 'none';
        }
    }
})();
