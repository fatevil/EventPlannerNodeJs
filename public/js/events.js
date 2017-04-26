const fetchMyEvents = function() {
    return fetch('/api/profile/events', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    }).then(function(data) {
        return data.json();
    });
};

const createRandomEvent = function() {
    return fetch('/api/events/random', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    }).then(function(data) {
        return data.json();
    });
};


const createEvent = function(formData) {
    return fetch('/api/events', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + getToken()
        },
        body: formData
    }).then(function(data) {
        console.log(data);
        console.log("created event!");
        return data.json();
    });
};