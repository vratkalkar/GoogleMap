function initialize() {


  var mapOptions = {
            center: new google.maps.LatLng(-20.397, 100644),
            zoom: 8,
            panControl: true,
            scaleControl: false,
            streetViewControl: true,
            overviewMapControl: true,
};

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
      'callback=initialize';
  document.body.appendChild(script);
}

window.onload = loadScript;

var marker;
function createMarker(coords, map, title){
  marker = new google.maps.Marker({
    position: coords,
    map: map,
    title: title
  });
}

function createImage(url){
  var image = {
    url: url,
    size: new google.maps.Size(32, 32),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0, 32)
  };
  return image;
}

function createCustomerMarker(coords,map,title){
  marker = new google.maps.Marker({
    position: coords,
    map: map,
    title: title,
    icon: createImage("/assets/icon.png")
  });
}

function createInfoWindow(text){
  var infowindow = new google.maps.InfoWindow({
    content: text
  });
  return infowindow;
}

// GEOCODING

var geocoding = new google.maps.Geocoder();
$("submit_button_geocoding").click(function(){
  codeAddress(geocoding);
});
$("#submit_button_reverse").click(function(){
  codeLatLng(geocoding);
});

function codeAddress(geocoding){
  var address = $("#search_box_geocoding").val();
  if(address.length > 0){
    geocoding.geocode({'address': address}, function(results,status){
      if(status == google.maps.GeocoderStatus.OK){
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      } else {
        alert("Geocode wa snot successful for the following reason: " + status);
      }
    });
  } else {
    alert("Search field can't be blank");
  }
}
      
