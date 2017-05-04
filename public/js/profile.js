const templateOtherProfiles = (profile) => {
    return `
             <div class="otherProfile">
                 <a href="/profile.html?_id=${profile._id}">
                 <p>${profile.name}</p>
                 </a>
             </div>
                  `;
}
const templateAttendingEvent = (event) => {
    return `
                <a href="/event_new.html?_id=${event._id}">
                    <p>${event.title}</p>
                </a>`;
}



const putProfileToDivs = function(data) {
        $('#nameParagraph').text(data.name);
        $('#emailParagraph').text(data.email);
        $('#placeParagraph').text(data.place_address);
        $('#latParagraph').text(data.place_address_lat);
        $('#lngParagraph').text(data.place_address_lng);
        $('#radiusParagraph').text(data.searching_radius);
        $('#profilePicture').attr('src', data.image_medium);

        /* google map */
        let map;
        let marker;
        let mapOptions;
        let mapCanvas;
        let mapBig;

        mapCanvas = document.getElementById('map');
        mapOptions = {
            center: new google.maps.LatLng(data.place_address_lat, data.place_address_lng),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            draggable: false
        };
        map = new google.maps.Map(mapCanvas, mapOptions);
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(data.place_address_lat, data.place_address_lng),
            map: map,
        });
        google.maps.event.addListener(map, 'mouseout', function() {
            this.setOptions({ scrollwheel: false });
        });
        map.addListener('click', function() {
            map.set('scrollwheel', true);
        });
        /* end of google map */

        fetchAttendingEventsById(data._id)
            .then(function(res) {
                res.forEach((profile) => {
                    $('#attendingDiv').prepend(templateAttendingEvent(profile));
                });
            })
            .catch(function(err) {
                console.log(err);
            });
        fetchHostingEventsById(data._id)
            .then(function(res) {
                res.forEach((profile) => {
                    $('#hostingDiv').prepend(templateAttendingEvent(profile));
                });
            })
            .catch(function(err) {
                console.log(err);
            });
        fetchFollowedFriends(data._id)
            .then(function(res) {
                //console.log(res);
                res.forEach((profile) => {
                    $('#profilesDiv').prepend(templateOtherProfiles(profile));
                });
            })
            .catch(function(err) {
                console.log(err);
            });
        return data;
    }
    // check if there's _id in url and if there is, display given profile instead of the logged one
const profileId = getUrlParameter('_id');
if (profileId) {

    fetchProfileById(profileId).then(putProfileToDivs)
        .catch(function(err) {
            console.log(err);
        });

    fetchCurrentProfile()
        .then(function(user) {

            if (user.following.includes(profileId)) {
                $('#unfollowProfile').show();
            } else {
                $('#followProfile').show();
            }
        })
        .catch(function(err) {
            console.log(err);
        });

    $('#followProfile').on('click', function() {
        // id taken from url
        followProfile(profileId)
            .then(function(result) {
                $('#unfollowProfile').show();
                $('#followProfile').hide();
            })
            .catch(function(err) {
                console.log(err);
            });
    });

    // id taken from url
    $('#unfollowProfile').on('click', function() {
        unfollowProfile(profileId)
            .then(function(result) {
                console.log(result);
                $('#unfollowProfile').hide();
                $('#followProfile').show();
            })
            .catch(function(err) {
                console.log(err);
            });
    });
} else {
    fetchCurrentProfile().then(putProfileToDivs)
        .catch(function(err) {
            console.log(err);
        });
}