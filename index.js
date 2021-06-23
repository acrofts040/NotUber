function init()

			//NEWER EDITS ADDED
			
			{
				// set 6 cars
				var landmark0 = new google.maps.LatLng(42.352271, -71.05524200000001);
				var landmark1 = new google.maps.LatLng(42.3453, -71.0464);
				var landmark2 = new google.maps.LatLng(42.3662, -71.0621);
				var landmark3 = new google.maps.LatLng(42.3603, -71.0547);
				var landmark4 = new google.maps.LatLng(42.3472, -71.0802);
				var landmark5 = new google.maps.LatLng(42.3663, -71.0544);
				var landmark6 = new google.maps.LatLng(	42.3542, -71.0704);
				var curlocation;
				
				var options = {
  					enableHighAccuracy: true,
  					timeout: 5000,
  					maximumAge: 0
				};

				function success(pos) {
 	 				var crd = pos.coords;
				  	console.log('Your current position is:');
				  	console.log(`Latitude : ${crd.latitude}`);
				  	console.log(`Longitude: ${crd.longitude}`);
				  	console.log(`More or less ${crd.accuracy} meters.`);
					var curlocation = new google.maps.LatLng(crd.latitude, crd.longitude);
				}

				function error(err) {
				  console.warn(`ERROR(${err.code}): ${err.message}`);
				}

				navigator.geolocation.getCurrentPosition(success, error, options);
				
				
				
				
				
				// Set up map with marker at 
				var myOptions = {
					zoom: 13, // The larger the zoom number, the bigger the zoom
					center: landmark0,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				
				// Create the map in the "map_canvas" <div>
				var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

				// Create a marker				
				var marker = new google.maps.Marker({
					position: landmark1,
					title: "Car 1",
					icon: 'car.png'
				});
				marker.setMap(map);

				var marker = new google.maps.Marker({
					position: landmark2,
					title: "car 2",
					icon: 'car.png'
				});
				marker.setMap(map);
				
				var marker = new google.maps.Marker({
					position: landmark3,
					title: "Car 3",
					icon: 'car.png'
				});
				marker.setMap(map);

				var marker = new google.maps.Marker({
					position: landmark4,
					title: "car 4",
					icon: 'car.png'
				});
				marker.setMap(map);
				
				var marker = new google.maps.Marker({
					position: landmark5,
					title: "Car 5",
					icon: 'car.png'
				});
				marker.setMap(map);

				var marker = new google.maps.Marker({
					position: landmark6,
					title: "car 6",
					icon: 'car.png'
				});
				marker.setMap(map);
				
				var marker = new google.maps.Marker({
					position: curlocation,
					title: "current location"
				});
				marker.setMap(map);
				
				
				
				// This is a global info window...
				var infowindow = new google.maps.InfoWindow();
				
				
				console.log(curlocation)
				
				// Open info window on click of marker
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.setContent(marker.title);
					infowindow.open(map, marker);
				});
			}
		
