function init()
			
			{
				var landmark0 = new google.maps.LatLng(42.352271, -71.05524200000001);
				var infowindow = new google.maps.InfoWindow();
				var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
				
				var lat = -99999;
				var lng = 99999;
				function getLocation() {
					navigator.geolocation.getCurrentPosition(function(somePos) {
						lat = somePos.coords.latitude;
						lng = somePos.coords.longitude;
						console.log(typeof lat);
						console.log(typeof lng);
						printLocation(parseFloat(lat),parseFloat(lng));
					});
				}
				function printLocation(lat, lng) {
					var curlatlng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
					
					
					var marker = new google.maps.Marker({
						position: curlatlng ,
						title: 'current location'
					});
					marker.setMap(map);

					console.log("LAT" + lat);
					request = new XMLHttpRequest();


					// Step 2: Make request to the JSON source
					request.open("POST", "https://bagged-inukshuk-96259.herokuapp.com/rides", true);

					request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

					var params = "username=PT88yXTq&lat=" +  lat.toString() + "&lng=" + lng.toString();
					
					lat = parseFloat(lat);
					lng = parseFloat(lng);
					// Step 3: What to do when we get a response back
					request.onreadystatechange = function() {
						// Step 5: parse the JSON data from response
						if (request.readyState == 4 && request.status == 200) {
							console.log("here");
							var p = JSON.parse(request.responseText);
							var cldist = 99999999999;
							var clsti = 0;
							var markers = []; 
						
							
							for (let i = 0; i < p.length; i++) {
								console.log(p[i].lng);
 								var closest = new google.maps.LatLng(parseFloat(p[i].lat), parseFloat(p[i].lng));
							
								var marker = new google.maps.Marker({
									position: closest,
									title: "close uber",
									icon: 'car.png'
								});
								marker.setMap(map);
								markers[i] = marker;
								console.log(closest);
								if (google.maps.geometry.spherical.computeDistanceBetween(curlatlng, closest) < cldist) {
  									var cldist = google.maps.geometry.spherical.computeDistanceBetween(curlatlng, closest);
									var clsti = i;
								}
							}
							
							console.log("HEERE" + clsti.toString());
							var closestr = new google.maps.LatLng(parseFloat(p[clsti].lat), parseFloat(p[clsti].lng));
							
							//Add description of closest marker
							var titlestring = "Closest vehicle: " + p[clsti].username.toString() + " at distance of " + cldist.toString(); 
							
							
							// Add current location marker with description
							var marker = new google.maps.Marker({
								position: curlatlng ,
								title: titlestring
							});
							
							//add listener
							google.maps.event.addListener(marker, 'click', function() {
								infowindow.setContent(marker.title);
								infowindow.open(map, marker);
							});
				
							
							
							//ATTEMPT TO ADD LINE
							
							//set path coords
							 const pathCoordinates = [
							    { curlatlng},
							    { closestr }
							  ];	
							
							var lineCoordinates = [
     								new google.maps.LatLng(lat, lng),
	     							new google.maps.LatLng(p[clsti].lat, p[clsti].lng)
							];
							
							//ADD LINE
							const carPath = new google.maps.Polyline({
   								path: lineCoordinates,
    								geodesic: true,
    								strokeColor: "#FF0000",
								strokeOpacity: 1.0,
							 	strokeWeight: 2,
							});
							carPath.setMap(map);
							
							
						}
					};

					
					request.send(params);
				}	
				
				getLocation();
				
				
				
				// Set up map with marker at 
				var myOptions = {
					zoom: 13, // The larger the zoom number, the bigger the zoom
					center: landmark0,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				
				// Create the map in the "map_canvas" <div>
				var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
				
				
			}
		
