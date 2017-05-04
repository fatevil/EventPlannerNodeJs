const fetchCurrentProfile = function() {
    return fetch('/api/profile', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    }).then(function(data) {
        return data.json();
    });
};


const fetchAttendingEventsById = function(id) {
    return fetch(`/api/profile/${id}/attending`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    }).then(function(data) {
        return data.json();
    });
};
const fetchHostingEventsById = function(id) {
    return fetch(`/api/profile/${id}/hosting`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    }).then(function(data) {
        return data.json();
    });
};

const fetchProfileById = function(id) {
    return fetch(`/api/profile/${id}`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    }).then(function(data) {
        return data.json();
    });
};


const fetchAllProfiles = function(id) {
    return fetch(`/api/profiles`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    }).then(function(data) {
        return data.json();
    });
};

const followProfile = function(id) {
    return fetch(`/api/profile/${id}/follow`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    }).then(function(data) {
        return data.json();
    });
};

const unfollowProfile = function(id) {
    return fetch(`/api/profile/${id}/unfollow`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    }).then(function(data) {
        return data.json();
    });
};