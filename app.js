function initMap() {
    if (typeof google === "undefined") {
        console.error("Google Maps API failed to load.");
        return;
    }
    var location = { lat: 19.0760, lng: 72.8777 }; // Mumbai, India
    var map = new google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 13,
    });
    var input = document.getElementById("searchBox");
    var searchBox = new google.maps.places.SearchBox(input);
    
    map.addListener("bounds_changed", function () {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    searchBox.addListener("places_changed", function () {
        var places = searchBox.getPlaces();
        if (places.length === 0) return;

        markers.forEach((marker) => marker.setMap(null));
        markers = [];
        var bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
            if (!place.geometry) return;
            var marker = new google.maps.Marker({
                map: map,
                title: place.name,
                position: place.geometry.location,
            });
            markers.push(marker);
            bounds.extend(place.geometry.location);
        });

        map.fitBounds(bounds);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    var mapButton = document.getElementById("mapButton");
    var mapContainer = document.getElementById("mapContainer");

    if (mapButton && mapContainer) {
        mapContainer.style.display = "none"; // Hide the map initially

        mapButton.addEventListener("click", function () {
            if (mapContainer.style.display === "none") {
                mapContainer.style.display = "block";
                if (!window.mapInitialized) {
                    initMap();
                    window.mapInitialized = true;
                }
            } else {
                mapContainer.style.display = "none";
            }
        });
    }
});
