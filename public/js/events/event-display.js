const eventId = getUrlParameter('_id');
if (eventId) {

    /* fetch event info from API */
    const event = fetchEventById(eventId)
        .then(function(event) {

            /* display event data to the page */
            $('#titleParagraph').text(event.title);
            $('#placeParagraph').text(event.place_address);
            $('#latParagraph').text(event.place_address_lat);
            $('#lngParagraph').text(event.place_address_lng);
            const formattedDate = moment(event.date).format('llll');
            $('#dateParagraph').text(formattedDate);
            $('#descriptionParagraph').text(event.description);
            $('#priceParagraph').text(event.price);
            $('#categoryParagraph').text(event.category);
            $('#quickDescriptionParagraph').text(event.quick_description);
            $('#eventImage').attr("src", event.headerImage);

            /* get images for attending people */
            fetchPeopleWhoAttend(event._id)
                .then(function(users) {
                    users.forEach((user) => {
                        $('#attendingPeopleDiv').append(`<a href="/profile.html?_id=${user._id}"><img alt="profile picture" class="profile-picture-thumbnail" src="${user.image_small}"></a>`);
                    });
                })
                .catch(function(err) {
                    console.log(err);
                });

            /* fetch the author's profile  */
            fetchProfileById(event.created_by)
                .then(function(res) {
                    $('#authorParagraph').append(`<a href="/profile.html?_id=${res._id}">${res.name}</a>`);
                })
                .catch(function(err) {
                    console.log(err);
                });
            /* end of author's profile */

            /* fetch current user's profile  */
            fetchCurrentProfile()
                .then(function(res) {
                    if (res.attending_events.includes(eventId)) {
                        $('#unattendEvent').show();
                    } else {
                        $('#attendEvent').show();
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
            /* end of current users's profile */

            /* google map */
            let map;
            let marker;
            let mapOptions;
            let mapCanvas;
            let mapBig;

            mapCanvas = document.getElementById('map');
            mapOptions = {
                center: new google.maps.LatLng(event.place_address_lat, event.place_address_lng),
                zoom: 8,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                draggable: false
            };
            map = new google.maps.Map(mapCanvas, mapOptions);
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(event.place_address_lat, event.place_address_lng),
                map: map,
            });
            google.maps.event.addListener(map, 'mouseout', function() {
                this.setOptions({ scrollwheel: false });
            });
            map.addListener('click', function() {
                map.set('scrollwheel', true);
            });
        })
        /* end of google map */

    .catch(function(err) {
        console.log(err);
    });




    /* let the API know that the user wants to attend this event, id taken from url */
    $('#attendEvent').on('click', function() {
        attendEvent(eventId)
            .then(function(result) {
                $('#alertUnattendingDiv').hide();
                $('#successAttendingDiv').show();
                $('#attendEvent').hide();
                $('#unattendEvent').show();
            })
            .catch(function(err) {
                console.log(err);
            });
    });
    /* end of attendEvent */

    /* let the API know that the user doesn't want to attend this event anymore, id taken from url */
    $('#unattendEvent').on('click', function() {
        unattendEvent(eventId)
            .then(function(result) {
                $('#successAttendingDiv').hide();
                $('#alertUnattendingDiv').show();
                $('#attendEvent').show();
                $('#unattendEvent').hide();
            })
            .catch(function(err) {
                console.log(err);
            });
    });
    /* end of unattendEvent */
}