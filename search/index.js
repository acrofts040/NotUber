function init()
{
	//Initialize coordinates
	var myLat = 42.352271;
	var myLng = -71.05524200000001;
	var me = new google.maps.LatLng(myLat, myLng);
	var meMarker = {};
	var myOptions = {
		zoom: 5,
		center: me,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map;
	var marker;
	var infowindow = new google.maps.InfoWindow();
	
	//Create new map on map canvas div, then get location
	function initMap() {
		map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		getMyLocation();
	}
	
	// function to detect user's location, and modify map accordingly
	function getMyLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				myLat = position.coords.latitude;
				myLng = position.coords.longitude;
				me = new google.maps.LatLng(myLat, myLng);
				meMarker = new google.maps.Marker({
					position: me,
					title: "Here I Am",
					//icon: "me.png",
					map: map
				});
				map.panTo(me);
				map.setZoom(13);

				// begin call of my API
				var request = new XMLHttpRequest();
				request.open("POST", "https://17w7nmrjl7.execute-api.us-east-1.amazonaws.com/NuberPython");
				request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
				//request.setRequestHeader('Access-Control-Allow-Origin', '*');
				
				
				request.onreadystatechange = function() {
					if (request.status == 200 && request.readyState == 4) {
						closestDistance = 9999999;
						closestVehicle = {}; //here
						console.log(request.responseText);
						//vehicles = JSON.parse(request.responseText);
						
						/*
						//iterate through returned vehicles
						for (count = 0; count < vehicles.length; count++) {
							vehicleLatLng = new google.maps.LatLng(vehicles[count].lat, vehicles[count].lng);
							distance = google.maps.geometry.spherical.computeDistanceBetween(me, vehicleLatLng);
							
							//check if current car is closest vehicle
							if (closestDistance > distance) {
								closestDistance = distance;
								closestVehicle = vehicleLatLng;
							}
							
							// add marker for the car
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
						
						//upon click on "me" marker, window shows who is the closest driver
						google.maps.event.addListener(meMarker, "click", function() {
							infowindow.setContent("Closest vehicle is " + closestDistance * 0.000621371 + " mi away!");
							infowindow.open(map, meMarker);
						});
						
						//create polyline to closest vehicle
						closestLine = new google.maps.Polyline({
							path: [me, closestVehicle],
							geodesic: true,
							strokeColor: '#000000',
							strokeOpacity: 0.75,
							strokeWeight: 10
						});
						closestLine.setMap(map);
						*/
					}
				}
				request.send(JSON.stringify({username:"andy",lat:23,lng: 23}));
			});
		}
		else {
			alert("Geolocation is not supported by your web browser.  What a shame!");
		}
	}
	
	//call functions
	initMap();
}
