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

const fetchUpcmingEvents = function() {
    return fetch('/api/events/upcoming', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    }).then(function(data) {
        return data.json();
    });
};
const fetchFollowedFriends = function(id) {
    return fetch(`/api/profile/${id}/following`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    }).then(function(data) {
        return data.json();
    });
};
const fetchPeopleWhoAttend = function(id) {
    return fetch(`/api/events/${id}/attending`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    }).then(function(data) {
        return data.json();
    });
};
const fetchFriendsEvents = function() {
    return fetch('/api/events/friends', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    }).then(function(data) {
        return data.json();
    });
};


const fetchEventsByLocation = function() {
    return fetch('/api/events/byLocation', {
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