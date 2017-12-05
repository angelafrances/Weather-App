/* global $ navigator Image APIKEY math*/

var latitude = "";
var longitude = "";
var localTemp = "";

$(document).ready(function() {

  function geoFindMe() {
    var loc = document.getElementById("cityState");
    var temps = document.getElementById("temperature");
   
  
    if (!navigator.geolocation){
      loc.innerHTML = "<p>Geolocation is not supported by your browser</p>";
      return;
    }
  
    function success(position) {
      latitude  = position.coords.latitude;
      longitude = position.coords.longitude;

       $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather",
        data: { lat: latitude, lon: longitude, units: "imperial", apiKey: APIKEY},
        success: function(weatherData){
          console.log(weatherData);
          loc.innerHTML = " " +weatherData.name;
          localTemp = weatherData.main.temp;
          temps.innerHTML = localTemp.toFixed() + " °C";
          // console.log(x);
          // temps.innerHTML = x + " °C"
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
  
});