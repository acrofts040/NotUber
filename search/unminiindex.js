function init()
			
			{
				var landmark0 = new google.maps.LatLng(40.867, -73.38);
				var infowindow = new google.maps.InfoWindow();
				//var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
				
				var lat = -99999;
				var lng = 99999;
				function getLocation() {
					navigator.geolocation.getCurrentPosition(function(somePos) {
						lat = somePos.coords.latitude;
						lng = somePos.coords.longitude;	
						//console.log(typeof lat);
						//console.log(typeof lng);
						printLocation(parseFloat(lat),parseFloat(lng));
					});
				}
				function printLocation(lat, lng) {
					var curlatlng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
					
					/*
					var marker = new google.maps.Marker({
						position: curlatlng ,
						title: 'current location'
					});
					marker.setMap(map);
					
					*/

					//console.log("LAT" + lat);
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
							//console.log("here");
							var p = JSON.parse(request.responseText);
							var cldist = 99999999999;
							var clsti = 0;
							var markers = []; 
							
							for (let i = 0; i < p.length; i++) {
								
								let xhr = new XMLHttpRequest();
								
								var getstring = 'https://api.onwater.io/api/v1/results/' + parseFloat(p[i].lat).toString() + ',' + parseFloat(p[i].lng).toString() + '?access_token=DiidmAH8hDQbvYzXFXrU';    
								
								xhr.open('GET', getstring);

								xhr.responseType = 'json';

								xhr.send();

								// the response is {"message": "Hello, world!"}
								xhr.onload = function() {
								let responseObj = xhr.response;

								console.log(responseObj.water);
								
  
								if (!responseObj.water){
								
									var closest = new google.maps.LatLng(parseFloat(p[i].lat), parseFloat(p[i].lng));

									var marker = new google.maps.Marker({
										position: closest,
										title: "close uber",
										icon: 'car.png'
									});
									marker.setMap(map);
									markers[i] = marker;
									//console.log(closest);

									if (google.maps.geometry.spherical.computeDistanceBetween(curlatlng, closest) < cldist) {
										var cldist = google.maps.geometry.spherical.computeDistanceBetween(curlatlng, closest);
										console.log("Closest : ");
										console.log(cldist);
										var clsti = i;
									}
									
								}
								};
									
							}
						

							var closestr = new google.maps.LatLng(parseFloat(p[clsti].lat), parseFloat(p[clsti].lng));
							
							cldist = cldist * 0.00062137;
							//Add description of closest marker
							var titlestring = "Closest vehicle: " + p[clsti].username.toString() + ", at a distance of " + cldist.toString() + " miles"; 
							
							
							// Add current location marker with description
							var marker = new google.maps.Marker({
								position: curlatlng ,
								title: titlestring
							});
							marker.setMap(map);
							//add listener
							google.maps.event.addListener(marker, 'click', function() {
								infowindow.setContent(marker.title);
								infowindow.open(map, marker);
							});
				
							
							
							//ADD LINE
							
							//set path coord
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
					zoom: 10, 
					center: landmark0,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				
				// Create the map in the "map_canvas" <div>
				var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

				
			}
		
