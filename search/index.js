
function init()
{
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

	function initMap() {
		map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		getMyLocation();
	}

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

				var request = new XMLHttpRequest();

				//FIRST CHANGE URL

				
				request.open("POST", "https://bagged-inukshuk-96259.herokuapp.com/rides");
				request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				request.onreadystatechange = function() {
					if (request.status == 200 && request.readyState == 4) {
						var closestDistance = 9999999;
						var closestVehicle = {};
						//BIG CHANGE
						var vehicles = JSON.parse(request.responseText);
						//BIG CHANGE
						for (let count = 0; count < vehicles.length; count++) {
							let vehicleLatLng = new google.maps.LatLng(vehicles[count].lat, vehicles[count].lng);
							let distance = google.maps.geometry.spherical.computeDistanceBetween(me, vehicleLatLng);
							
							/*
							if (closestDistance > distance) {
								closestDistance = distance;
								closestVehicle = vehicleLatLng;
							}
							*/
							
							//Ensure coords are valid
							let xhr = new XMLHttpRequest();	
							var getstring = 'https://api.onwater.io/api/v1/results/' + parseFloat(vehicles[count].lat).toString() + ',' + parseFloat(vehicles[count].lng).toString() + '?access_token=uvEZfr54fHF49WRgrX4_';    
							xhr.open('GET', getstring);
							xhr.responseType = 'json';
							xhr.send();
							xhr.onload = function() {
								let responseObj = xhr.response;
								//console.log(responseObj.water);
								//console.log(vehicles[count]);
								
								if (closestDistance > distance && (!responseObj.water)) {
								closestDistance = distance;
								closestVehicle = vehicleLatLng;
								}
								
								
								if (!responseObj.water){
									console.log("in");
									console.log(count);
									console.log(vehicleLatLng);
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
							};
								
							
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

			//console.log("Ran");
		}
		else {
			alert("Geolocation is not supported by your web browser.  What a shame!");
		}
	}
	
	//call functions
	initMap();
}
