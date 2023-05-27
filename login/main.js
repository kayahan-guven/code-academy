let tryCount = Number(localStorage.getItem('tryCount') || '0');

window.onload = function () {
    const submitBtn = document.getElementById('submit-btn');
    const signInBtn = document.getElementById('sign-in-btn');
    const loginBtn = document.getElementById('go-to-login');

    function init () {
        checkLoginStatus();
        checkButtonStatus();
    }

    function checkLoginStatus () {
        const loginStatus = JSON.parse(localStorage.getItem('isUserLoggedIn'));

        if (loginStatus) {
            goToLastPage();
        }
    }

    function checkButtonStatus () {
        if (tryCount === 3) {
            submitBtn.classList.add('disabled');
        }
    }

    function goToLogin () {
        document.getElementById('form-sign-in').style.display = 'none';
        document.getElementById('form-login').style.display = 'block';
    }

    function getUserInfo () {
        return JSON.parse(localStorage.getItem('user'));
    }

    function goToLastPage () {
        document.getElementById('form-sign-in').style.display = 'none';
        document.getElementById('form-login').style.display = 'none';
        document.querySelector('.logged-in-user').style.display = 'block';


        document.querySelector('.logged-in-user > div > .name').textContent = getUserInfo().name;
    }

    loginBtn.addEventListener('click', goToLogin);

    signInBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const email = document.getElementById('email-sign-in').value;
        const password = document.getElementById('password-sign-in').value
        const passwordRepeat = document.getElementById('password-repeat').value
        const name = document.getElementById('name').value;

        if (password !== passwordRepeat) {
            return;
        }

        const user = {
            email: email,
            password: password,
            name: name
        };

        if (document.getElementById('remember-me').checked) {
            localStorage.setItem('user', JSON.stringify(user));
        }

        goToLogin();
    });

    submitBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value
        const user = getUserInfo();

        if (user.email === email && user.password === password) {
            alert('Logged in');
            document.querySelector('.logged-in-user').style.display = 'block';
            document.getElementById('form-login').style.display = 'none';
            document.querySelector('.logged-in-user > div > .name').textContent = user.name

            localStorage.setItem('isUserLoggedIn', 'true');
        } else {
            tryCount++;

            localStorage.setItem('tryCount', tryCount.toString())
            alert('Wrong email/password');
        }

        checkButtonStatus();
    });

    init();
}
