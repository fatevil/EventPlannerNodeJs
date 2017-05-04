/* Google map features*/

let place_address_lat;
let place_address_lng;
let place_address;

function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13,
        scrollwheel: false,
    });
    google.maps.event.addListener(map, 'mouseout', function() {
        this.setOptions({ scrollwheel: false });
    });
    map.addListener('click', function() {
        map.set('scrollwheel', true);
    });
    const card = document.getElementById('pac-card');
    const input = document.getElementById('pac-input');
    const types = document.getElementById('type-selector');
    const strictBounds = document.getElementById('strict-bounds-selector');

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

    const autocomplete = new google.maps.places.Autocomplete(input);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);

    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    const marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        const place = autocomplete.getPlace();
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

        let address = '';
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
        const radioButton = document.getElementById(id);
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
/* end of Google map features*/


/* util methods for showing and hiding divs*/

const showAndHide = function(element) {
        element.hide();
        element.show();
    }
    /* end of util methods*/

/* validation and sumbitting form*/
$('#createEventSubmit').on('click', function(event) {
    event.preventDefault();
    const date = $('#registration-date').val();
    const time = $('#registration-time').val();

    const concantated = `${date} ${time}`;
    const milliseconds = moment(concantated, "YYYY-MM-DD HH:mm").format('x');

    let notValid = false;
    if (place_address == undefined) {
        showAndHide($('#alertLocation'));
        notValid = true;
    }
    if ($('#inputTitle').val() == '') {
        showAndHide($('#alertTitle'));
        notValid = true;
    }
    const fileInput = document.getElementById('imageInput');
    if (fileInput.files.length == 0) {
        showAndHide($('#alertImage'));
        notValid = true;
    }
    if (notValid == true) {
        return;
    }

    const formData = new FormData();
    formData.append('title', $('#inputTitle').val());
    formData.append('quickDescription', $('#inputQuickDescription').val());
    formData.append('description', $('#inputDescription').val());
    formData.append('place_address', place_address);
    formData.append('place_address_lng', place_address_lng);
    formData.append('place_address_lat', place_address_lat);
    formData.append('category', $('#inputCategory').val());
    formData.append('price', $('#inputPrice').val());
    formData.append('image', fileInput.files[0]);
    formData.append('date', milliseconds);

    createEvent(formData)
        .then(function(res) {
            //console.log(res);
            window.location.href = `/event_new.html?_id=${res._id}`;
        })
        .catch(function(err) {
            console.log(err);
        });

});
/* end of validation and sumbitting form*/

/*Date picker*/
let set;

function addNow() {
    let nowDate = moment().tz("Europe/London").format('YYYY-MM-DD');
    let nowTime = moment().tz("Europe/London").format('HH:mm');
    document.getElementById('registration-date').value = nowDate;
    document.getElementById('registration-time').value = nowTime;
}
/*end of date picker*/