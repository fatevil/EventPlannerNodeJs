const fetchAllEvents = function() {
    return fetch('/api/events', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    }).then(function(data) {
        return data.json();
    });
};

const fetchEventById = function(id) {
    return fetch(`/api/event/${id}`, {
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
        return data.json();
    });
};



const attendEvent = function(id) {
    return fetch(`/api/event/${id}/attend`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    }).then(function(data) {
        return data.json();
    });
};

const unattendEvent = function(id) {
    return fetch(`/api/event/${id}/unattend`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    }).then(function(data) {
        return data.json();
    });
};