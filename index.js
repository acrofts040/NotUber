function init()

			//NEWER  
			
			{
				// set 6 cars
				var landmark0 = new google.maps.LatLng(42.352271, -71.05524200000001);
				/*
				var landmark1 = new google.maps.LatLng(42.3453, -71.0464);
				var landmark2 = new google.maps.LatLng(42.3662, -71.0621);
				var landmark3 = new google.maps.LatLng(42.3603, -71.0547);
				var landmark4 = new google.maps.LatLng(42.3472, -71.0802);
				var landmark5 = new google.maps.LatLng(42.3663, -71.0544);
				var landmark6 = new google.maps.LatLng(	42.3542, -71.0704);
				*/
				var infowindow = new google.maps.InfoWindow();
				
				
				var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
				
				
				
				var lat = -99999;
				var lng = -99999;
				function getLocation() {
					navigator.geolocation.getCurrentPosition(function(somePos) {
						lat = somePos.coords.latitude;
						lng = somePos.coords.longitude;
						printLocation(lat,lng);
					});
				}

				function printLocation(lat, lng) {
					var curlatlng = new google.maps.LatLng(lat, lng);
					
					var marker = new google.maps.Marker({
						position: curlatlng ,
						title: 'current location'
					});
					marker.setMap(map);

					console.log(lat);
					request = new XMLHttpRequest();


					// Step 2: Make request to the JSON source
					request.open("POST", "https://jordan-marsh.herokuapp.com/rides", true);

					request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

					var params = "username=PT88yXTq&lat=" +  lat.toString() + "&lng=" + lng.toString();
					console.log(params);

					// Step 3: What to do when we get a response back
					console.log("Here I am 2");
					request.onreadystatechange = function() {
						// Step 5: parse the JSON data from response
						console.log("Here I am 3");
						if (request.readyState == 4 && request.status == 200) {
							console.log(request.status);
							var p = JSON.parse(request.responseText);
							console.log(p[0].lat);
							console.log(p[0].lng);
							console.log(p[0].username);
							var cldist = 99999999999;
							var clsti = 0;
							for (let i = 0; i < p.length; i++) {
 								var closest = new google.maps.LatLng(p[i].lat, p[i].lng);
							
								var marker = new google.maps.Marker({
									position: closest,
									title: "close uber",
									icon: 'car.png'
								});
								marker.setMap(map);
								
								
								if (google.maps.geometry.spherical.computeDistanceBetween(curlatlng, closest) < cldist) {
  									var cldist = google.maps.geometry.spherical.computeDistanceBetween(curlatlng, closest);
									var clsti = i;
								}
							}
							
							console.log("HEERE" + clsti.toString());
							
						}
					};

					
					request.send(params);
					console.log(request.responsetext);

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

				// Create a marker				
				
				/*
				var marker1 = new google.maps.Marker({
					position: landmark1,
					title: "Car 1",
					icon: 'car.png'
				});
				marker1.setMap(map);
				
				google.maps.event.addListener(marker1, 'click', function() {
					infowindow.setContent(marker1.title);
					infowindow.open(map, marker1);
				});
				

				var marker2 = new google.maps.Marker({
					position: landmark2,
					title: "car 2",
					icon: 'car.png'
				});
				marker2.setMap(map);
				
				google.maps.event.addListener(marker2, 'click', function() {
					infowindow.setContent(marker2.title);
					infowindow.open(map, marker2);
				});
				
				
				var marker3 = new google.maps.Marker({
					position: landmark3,
					title: "Car 3",
					icon: 'car.png'
				});
				marker3.setMap(map);
				
				google.maps.event.addListener(marker3, 'click', function() {
					infowindow.setContent(marker3.title);
					infowindow.open(map, marker3);
				});
				
				
				

				var marker4 = new google.maps.Marker({
					position: landmark4,
					title: "car 4",
					icon: 'car.png'
				});
				marker4.setMap(map);
				
				google.maps.event.addListener(marker4, 'click', function() {
					infowindow.setContent(marker4.title);
					infowindow.open(map, marker4);
				});
				
				
				
				var marker5 = new google.maps.Marker({
					position: landmark5,
					title: "Car 5",
					icon: 'car.png'
				});
				marker5.setMap(map);
				
				google.maps.event.addListener(marker5, 'click', function() {
					infowindow.setContent(marker5.title);
					infowindow.open(map, marker5);
				});
				
				
				

				var marker6 = new google.maps.Marker({
					position: landmark6,
					title: "car 6",
					icon: 'car.png'
				});
				marker6.setMap(map);
				
				
				google.maps.event.addListener(marker6, 'click', function() {
					infowindow.setContent(marker6.title);
					infowindow.open(map, marker6);
				});
				*/
				
				
			}
		
