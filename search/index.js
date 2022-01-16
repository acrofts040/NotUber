function smoothZoom (map, max, cnt) {
    if (cnt >= max) {
        return;
    }
    else {
        z = google.maps.event.addListener(map, 'zoom_changed', function(event){
            google.maps.event.removeListener(z);
            smoothZoom(map, max, cnt + 1);
        });
        setTimeout(function(){map.setZoom(cnt)}, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
    }
} 



function init()
{
	var myLat = 42.352271;
@@ -48,11 +32,10 @@ function init()
					map: map
				});
				map.panTo(me);
				//map.setZoom(13);
				//attempt to zoom in smoothly
				smoothZoom(map, 13, 5);
				//animateMapZoomTo(map, 13);

				map.setZoom(13);


				var request = new XMLHttpRequest();

				//FIRST CHANGE URL
				//request.open("POST", "https://hans-moleman.herokuapp.com/rides");
				request.open("POST", "https://bagged-inukshuk-96259.herokuapp.com/rides");
				request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				request.onreadystatechange = function() {
					if (request.status == 200 && request.readyState == 4) {
						closestDistance = 9999999;
						closestVehicle = {};
						vehicles = JSON.parse(request.responseText);
						for (count = 0; count < vehicles.length; count++) {
							vehicleLatLng = new google.maps.LatLng(vehicles[count].lat, vehicles[count].lng);
							distance = google.maps.geometry.spherical.computeDistanceBetween(me, vehicleLatLng);
							if (closestDistance > distance) {
								closestDistance = distance;
								closestVehicle = vehicleLatLng;
							}
							marker = new google.maps.Marker({
								position: vehicleLatLng,
								title: "Vehicle " + vehicles[count].username + " is " + distance * 0.000621371 + " mi away from you",
								icon: "car.png",
								map: map
							});
							google.maps.event.addListener(marker, "click", function() {
								infowindow.setContent(this.title);
								infowindow.open(map, this);
							});
						}
						google.maps.event.addListener(meMarker, "click", function() {
							infowindow.setContent("Closest vehicle is " + closestDistance * 0.000621371 + " mi away!");
							infowindow.open(map, meMarker);
						});
						
						
						
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
						closestLine = new google.maps.Polyline({
							path: [me, closestVehicle],
							geodesic: true,
							strokeColor: '#1D8ECE',
							strokeOpacity: 0.75,
							strokeWeight: 10
						});
						closestLine.setMap(map);
						
						console.log("calling directions");
						//Directions();
						console.log("done");
					}
				}
				//CHANGE 2: CHANGE PARAMS
				request.send("username=andymobile&lat=" + myLat + "&lng=" + myLng);
			});
			console.log("Ran");
		}
		else {
			alert("Geolocation is not supported by your web browser.  What a shame!");
		}
	}
	
	//call functions
	initMap();
}
