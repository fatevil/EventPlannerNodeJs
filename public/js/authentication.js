const saveToken = function(token) {
    window.localStorage['mean-token'] = token;
};

const getToken = function() {
    return window.localStorage['mean-token'];
};

const isLoggedIn = function() {
    const token = getToken();
    let payload;

    if (token) {
        payload = token.split('.')[1];
        console.log(token);
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
        const payload = token.split('.')[1];
        payload = window.atob(payload);
        payload = JSON.parse(payload);
        return {
            email: payload.email,
            name: payload.name
        };
    }
};

const register = function(user) {
    return $http.post('/api/register', user).success(function(data) {
        saveToken(data.token);
    });
};

const login = function(formData) {


    const options = {
        method: 'POST',
        //body: JSON.stringify(formData),
        body: formData,
        headers: {
            //"Content-Type": "application/json"
        }
    };
    return fetch('/api/login', options).then(function(data) {
        return data.json();
    }).then(function(data) {
        //console.log(data);
        saveToken(data.token);
    });
};

const logout = function() {
    $window.localStorage.removeItem('mean-token');
};