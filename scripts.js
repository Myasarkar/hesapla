function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.0082, lng: 28.9784}, // Istanbul koordinatları
        zoom: 12
    });

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    var originInput = document.getElementById('origin-input');
    var destinationInput = document.getElementById('destination-input');
    var originAutocomplete = new google.maps.places.Autocomplete(originInput, {types: ['geocode'], componentRestrictions: {country: 'tr'}, strictBounds: true});
    var destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput, {types: ['geocode'], componentRestrictions: {country: 'tr'}, strictBounds: true});

    document.getElementById('submit').addEventListener('click', function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    });

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var origin = originInput.value;
        var destination = destinationInput.value;

        if (origin && destination) {
            map.setCenter({lat: 41.0082, lng: 28.9784}); // Istanbul koordinatları
            map.setZoom(12);

            directionsDisplay.setMap(map);
            directionsService.route({
                origin: origin,
                destination: destination,
                travelMode: 'DRIVING'
            }, function(response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                    document.getElementById('map').style.display = 'block';

                    var route = response.routes[0];
                    var distance = 0;
                    for (var i = 0; i < route.legs.length; i++) {
                        distance += route.legs[i].distance.value;
                    }
                    var distanceInKm = distance / 1000;
                    var fare = Math.max(90, distanceInKm * 15); // Minimum ücret 90 TL
                    fare += 25; // 25 TL ekleniyor
                    document.getElementById('result').innerHTML = 'Yolculuk Mesafesi: ' + distanceInKm.toFixed(2) + ' km<br>Yolculuk Ücreti: ' + fare.toFixed(2) + ' TL';
                } else {
                    window.alert('Yolculuk bulunamadı: ' + status);
                }
            });
        } else {
            window.alert('Lütfen başlangıç ve varış konumlarını girin.');
        }
    }
}
