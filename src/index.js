function formatDate() {
  let currentTime = new Date();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let day = days[currentTime.getDay()];
  let date = currentTime.getDate();
  let month = months[currentTime.getMonth()];
  let year = currentTime.getFullYear();
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dateAndTime = document.querySelector(".date");
  dateAndTime.innerHTML = `${day} ${date} ${month} ${year} ${hours}:${minutes}`;
}

formatDate();

function showWeather(response) {
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.name;
  let currentTemperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = `${currentTemperature}˚F`;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${response.data.main.humidity}`;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = `${response.data.weather[0].main}`;
  let currentHighTemp = document.querySelector("#currentHigh");
  currentHighTemp.innerHTML = `${Math.round(response.data.main.temp_max)}˚`;
  let currentLowTemp = document.querySelector("#currentLow");
  currentLowTemp.innerHTML = `${Math.round(response.data.main.temp_min)}˚`;
}

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector(".search-bar");
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = input.value;
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", searchCity);

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function displayCurrentLocationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentLocationWeather = document.querySelector(".current-location-button");
currentLocationWeather.addEventListener("click", displayCurrentLocationWeather);

/*
function displayCelcius() {
  let celcius = "-5˚C";
  let celciusTemp = document.querySelector("#currentTemp");
  celciusTemp.innerHTML = celcius;
}

let celcius = document.querySelector("a .celcius");
celcius.addEventListener("click", displayCelcius);

function displayFarenheit() {
  let farenheit = "22˚F";
  let farenheitTemp = document.querySelector("#currentTemp");
  farenheitTemp.innerHTML = farenheit;
}

let farenheit = document.querySelector("a .farenheit");
farenheit.addEventListener("click", displayFarenheit);
*/
