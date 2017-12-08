/* global $ navigator Image APIKEY math*/

var latitude = "";
var longitude = "";
var loc = document.getElementById("cityState");
var temps = document.getElementById("tempDisplay");
var descrip = document.getElementById("tempDescrip");
var tempLoc = document.getElementById("temperature");
var store = "";

$(document).ready(function() {

  function geoFindMe() {


    if (!navigator.geolocation) {
      loc.innerHTML = "<p>Geolocation is not supported by your browser</p>";
      return;
    }

    function success(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather",
        data: { lat: latitude, lon: longitude, units: "imperial", apiKey: APIKEY },
        success: function(weatherData) {

          loc.innerHTML = " " + weatherData.name;
          temps.innerHTML = weatherData.main.temp.toFixed() + " °F";
          var iconUrl = "https://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";
          var wIcon = document.createElement("IMG");
          wIcon.setAttribute("src", iconUrl);
          tempLoc.appendChild(wIcon);

          descrip.innerHTML = weatherData.weather[0].description;
          store = weatherData.main.temp.toFixed();
          console.log(store);

        }

      })


    }


    function error() {
      loc.innerHTML = "Unable to retrieve your location";
    }


    loc.innerHTML = "<p>locating...</p>";

    navigator.geolocation.getCurrentPosition(success, error);

  }
  geoFindMe();


})

$('#toggle').change(function() {
  var x = document.getElementById('tempDisplay').innerHTML = "";
  if($(this).is(':checked')){
    var x = (store - 32) * (5/9);
    document.getElementById('tempDisplay').innerHTML = (x.toFixed() + " °C");
    
  } else {
    var y = x * 9/5 + 32;
    document.getElementById('tempDisplay').innerHTML = (y.toFixed() + " °F");

  }
})

