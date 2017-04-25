const fetchMyEvents = function() {
    return fetch('/api/events', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    }).then(function(data) {
        console.log(data);
        console.log("response events");
        return data.json();
    });
};