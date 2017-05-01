let place_address_lat;
let place_address_lng;
let place_address;


// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13
    });
    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    var types = document.getElementById('type-selector');
    var strictBounds = document.getElementById('strict-bounds-selector');

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

    var autocomplete = new google.maps.places.Autocomplete(input);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            alert(place.geometry.location);
            map.setCenter(place.geometry.location);
            map.setZoom(17); // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
        place_address_lat = place.geometry.location.lat();
        place_address_lng = place.geometry.location.lng();
        place_address = place.name;


        infowindowContent.children['place-icon'].src = place.icon;
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent = address;
        infowindow.open(map, marker);
    });

    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    function setupClickListener(id, types) {
        var radioButton = document.getElementById(id);
        radioButton.addEventListener('click', function() {
            autocomplete.setTypes(types);
        });
    }

    setupClickListener('changetype-all', []);
    setupClickListener('changetype-address', ['address']);
    setupClickListener('changetype-establishment', ['establishment']);
    setupClickListener('changetype-geocode', ['geocode']);

    document.getElementById('use-strict-bounds')
        .addEventListener('click', function() {
            console.log('Checkbox clicked! New state=' + this.checked);
            autocomplete.setOptions({ strictBounds: this.checked });
        });
}



fetchAllEvents()
    .then(function(res) {
        //console.log(res);
        res.forEach((event) => {
            $('#eventsDiv').prepend(`${event.title} <a href="/event.html?_id=${event._id}">link</a> <br>`);
        });
    })
    .catch(function(err) {
        console.log(err);
    });

fetchUpcmingEvents()
    .then(function(res) {
        //console.log(res);
        res.forEach((event) => {
            $('#upcomingDiv').prepend(`${event.title} <a href="/event.html?_id=${event._id}">link</a> <br>`);
        });
    })
    .catch(function(err) {
        console.log(err);
    });

$('#createEventSubmit').on('click', function(event) {
    event.preventDefault();
    const date = $('#registration-date').val();
    const time = $('#registration-time').val();

    const concantated = `${date} ${time}`;
    const milliseconds = moment(concantated, "YYYY-MM-DD HH:mm").format('x');

    const formData = new FormData();
    formData.append('title', $('#inputTitle').val());
    formData.append('place_address', place_address);
    formData.append('place_address_lng', place_address_lng);
    formData.append('place_address_lat', place_address_lat);
    formData.append('date', milliseconds);

    createEvent(formData)
        .then(function(res) {
            //console.log(res);
            $('#eventsDiv').prepend(`${res.title} <a href="/event.html?_id=${res._id}">link</a> <br>`);
        })
        .catch(function(err) {
            console.log(err);
        });

});


/*Date picker*/
let set;

function addNow() {
    let nowDate = moment().tz("Europe/London").format('YYYY-MM-DD');
    let nowTime = moment().tz("Europe/London").format('HH:mm');
    document.getElementById('registration-date').value = nowDate;
    document.getElementById('registration-time').value = nowTime;
}
/*end of date picker*/