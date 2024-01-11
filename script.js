const temp = document.getElementById("temp"),
dateTime = document.getElementById("date-time");
currentLocation = document.getElementById("location");
condition = document.getElementById("condition");
rain = document.getElementById("rain");
latitude = document.getElementById("latitude");
longitude = document.getElementById("longitude");
mainIcon = document.getElementById("icon");
uvIndex = document.getElementById("uv-index");
windSpeed = document.getElementById("wind-speed");
sunRise = document.getElementById("sunrise");
sunSet = document.getElementById("sunset");
sunRise = document.getElementById("sunrise");

let currentCity = "";
let currentUnit = "c";
let hourlyOrWeek = "Week";

// Update Date Time
function getDateTime() {
  let now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  hour = hour % 12;
  if (hour < 10) {
    hour = "0" + hour;
  }

  // Ensure minutes are always two digits
  if (minute < 10) {
    minute = "0" + minute;
  }

  let dayString = days[now.getDay()];
  return `${dayString}, ${hour}:${minute}`;
}

// Example usage
dateTime.innerText = getDateTime();

// Update date every second
setInterval(() => {
  dateTime.innerText = getDateTime();
}, 1000);

// Function to get public IP with fetch
function getPublicIp() {
  fetch("https://geolocation-db.com/json/", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      currentCity = data.city;
      getWeatherData(currentCity, currentUnit, hourlyOrWeek);
    })
    .catch((error) => {
      console.error("Error fetching public IP:", error);
    });
}

getPublicIp();

// Function to get weather data
function getWeatherData(city, unit, hourlyOrWeek) {
  const apiKey = "ECUAMFQF4F9JD8JU85SBLUTZN";
  fetch(
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/colombo?unitGroup=metric&key=ECUAMFQF4F9JD8JU85SBLUTZN&contentType=json',
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      let today = data.currentConditions;

      if (unit === "c") {
        temp.innerText = today.temp;
      } else {
        temp.innerText = celsiusToFahrenheit(today.temp);
      }
      currentLocation.innerText = data.resolvedAddress;
      condition.innerText = today.condition;
      rain.innerText = "Perc -" + today.precip +"%" ;
      latitude.innerText = "Latitude : " + today.latitude;
      longitude.innerText = "Longitude : " + today.longitudeitude;
    });
}

 function celsiusToFahrenheit(temp) {
  return ((temp * 9) / 5 + 32).toFixed(2);
 }
