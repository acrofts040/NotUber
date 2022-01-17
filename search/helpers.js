
// smooth zoom function
function smoothZoom (map, max, cnt) {
    if (cnt >= max) {
        return;
    }
    else {
        z = google.maps.event.addListener(map, 'zoom_changed', function(event){
            google.maps.event.removeListener(z);
            smoothZoom(map, max, cnt + 1);
        });
        setTimeout(function(){map.setZoom(cnt)}, 80); 
    }
} 

function animateMapZoomTo(map, targetZoom) {
    var currentZoom = arguments[2] || map.getZoom();
    if (currentZoom != targetZoom) {
        google.maps.event.addListenerOnce(map, 'zoom_changed', function (event) {
            animateMapZoomTo(map, targetZoom, currentZoom + (targetZoom > currentZoom ? 1 : -1));
        });
        setTimeout(function(){ map.setZoom(currentZoom) }, 80);
    }

    //DIRECTIONS ATTEMPT 1
						/*
						function Directions() {
							  var directionsService = new google.maps.DirectionsService();
							  var directionsRenderer = new google.maps.DirectionsRenderer();
							  var start = closestVehicle;
							  directionsRenderer.setMap(map);
							}
							function calcRoute() {
							  var start = start;
							  var end = me;
							console.log("calcing route");
							  var request = {
							    origin: start,
							    destination: end,
							    travelMode: 'DRIVING'
							  };
							  directionsService.route(request, function(result, status) {
							    if (status == 'OK') {
							      directionsRenderer.setDirections(result);
							    }
							  });
							}
						*/
