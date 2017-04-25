const saveToken = function(token) {
    window.localStorage['mean-token'] = token;
};

const getToken = function() {
    return window.localStorage['mean-token'];
};

const isLoggedIn = function() {
    const token = getToken();
    let payload;
    if (token !== 'undefined') {
        payload = token.split('.')[1];
        payload = window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
    } else {
        return false;
    }
};

const currentUser = function() {
    if (isLoggedIn()) {
        const token = getToken();
        let payload = token.split('.')[1];
        payload = window.atob(payload);
        payload = JSON.parse(payload);
        return {
            email: payload.email,
            name: payload.name
        };
    }
};

const register = function(formData) {
    return fetch('/api/register', {
        method: 'POST',
        body: formData,
    }).then(function(data) {
        return data.json();
    }).then(function(data) {
        saveToken(data.token);
    });
};

const login = function(formData) {
    return fetch('/api/login', {
        method: 'POST',
        body: formData,
    }).then(function(data) {
        return data.json();
    }).then(function(data) {
        saveToken(data.token);
    });
};

const logout = function() {
    $window.localStorage.removeItem('mean-token');
};