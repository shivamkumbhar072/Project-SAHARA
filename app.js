let map;
        let marker;
        let autocomplete;

        function initMap() {
            const defaultLocation = { lat: 18.5204, lng: 73.8567 }; // Pune, India
            
            // Initialize Map
            map = new google.maps.Map(document.getElementById("map"), {
                zoom: 12,
                center: defaultLocation
            });

            // Add Marker
            marker = new google.maps.Marker({
                position: defaultLocation,
                map: map
            });

            // Initialize Places Autocomplete
            autocomplete = new google.maps.places.Autocomplete(document.getElementById("locationInput"));
            autocomplete.addListener("place_changed", function() {
                const place = autocomplete.getPlace();
                if (!place.geometry) {
                    alert("No details available for this location.");
                    return;
                }

                // Update map and marker
                map.setCenter(place.geometry.location);
                map.setZoom(14);
                marker.setPosition(place.geometry.location);
            });
        }

function redirectToLogin() {
    window.location.href = "login.html"; // Change this to your login page URL
}