const fetchMyEvents = function() {
    return fetch('/api/events', {
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
        console.log(data);
        console.log("response events random");
        return data.json();
    });
};