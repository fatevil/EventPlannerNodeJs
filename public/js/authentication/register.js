/* Google map features */
let place_address_lat;
let place_address_lng;
let place_address;
let circle;

function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 10
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
            map.setCenter(place.geometry.location);
            map.setZoom(10); // Why 17? Because it looks good.
        }
        map.setZoom(13);
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
        $("#ex6").slider("enable");

        infowindowContent.children['place-icon'].src = place.icon;
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent = address;
        infowindow.open(map, marker);

        if (circle) {
            circle.setMap(null);
            circle = null;
        }
        // Add circle overlay and bind to marker
        circle = new google.maps.Circle({
            map: map,
            radius: 1500, // 10 miles in metres
            fillColor: '#AA0000'
        });
        circle.bindTo('center', marker, 'position');
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
            //console.log('Checkbox clicked! New state=' + this.checked);
            autocomplete.setOptions({ strictBounds: this.checked });
        });
}
/* end of google map features  */

/* quickly hide and show given element */
const hideAndShow = function(element) {
    element.hide();
    element.show();
}
const hide = function(element) {
        element.hide();
    }
    /* end of hide and show*/

/* Registration form validation and sumbitting */

$('#registerForm').submit(function(event) {
    event.preventDefault();
    let notValid = false;
    const fileInput = document.getElementById('imageInput');
    if (fileInput.files.length == 0) {
        hideAndShow($('#alertImage'));
        notValid = true;
    } else {
        hide($('#alertImage'));
    }
    if (place_address == undefined) {
        hideAndShow($('#alertLocation'));
        notValid = true;
    } else {
        hide($('#alertLocation'));
    }
    if ($('#inputUsername').val() == '') {
        hideAndShow($('#alertUsername'));
        notValid = true;
    } else {
        hide($('#alertUsername'));
    }
    if ($('#inputPassword').val() == '') {
        hideAndShow($('#alertPassword'));
        notValid = true;
    } else {
        hide($('#alertPassword'));
    }
    if ($('#inputEmail').val() == '') {
        hideAndShow($('#alertEmail'));
        notValid = true;
    } else {
        hide($('#alertEmail'));
    }

    if (notValid == true) {
        return;
    }

    const formData = new FormData();
    formData.append('name', $('#inputUsername').val());
    formData.append('email', $('#inputEmail').val());
    formData.append('password', $('#inputPassword').val());
    formData.append('place_address', place_address);
    formData.append('place_address_lng', place_address_lng);
    formData.append('place_address_lat', place_address_lat);
    formData.append('searching_radius', circle.getRadius());
    formData.append('image', fileInput.files[0]);

    register(formData)
        .then(function() {
            window.location.href = `/login.html`;
        })
        .catch(function(err) {
            console.log(err);
        });
});
/* end of form submitting */

/*  slider featurues  */
$("#ex6").slider();
$("#ex6").on("slide", function(slideEvt) {
    $("#ex6SliderVal").text(slideEvt.value);
    if (circle) {
        circle.setRadius(slideEvt.value * 500);
    }

});
let originalVal;
$('#ex6').slider().on('slideStart', function(ev) {
    originalVal = $('#ex6').data('slider').getValue();
});

$('#ex6').slider().on('slideStop', function(ev) {
    var newVal = $('#ex6').data('slider').getValue();
    if (originalVal != newVal) {
        //alert('Value Changed!');
    }
});
/* end of slider */