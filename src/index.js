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
  document.querySelector("#city").innerHTML = response.data.name;
  let currentTemperature = Math.round(response.data.main.temp);
  document.querySelector("#currentTemp").innerHTML = `${currentTemperature}˚`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}`;
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.weather[0].main}`;
  document.querySelector("#currentHigh").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}˚`;
  document.querySelector("#currentLow").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}˚`;

  farenheitTemp = response.data.main.temp;
}

function showDefault(city) {
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector(".search-bar");
  document.querySelector("#city").innerHTML = input.value;
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

function displayCelciusTemperature(event) {
  event.preventDefault();
  let celciusTemp = (5 / 9) * (farenheitTemp - 32);
  farenheitTemperature.classList.remove("active");
  celciusTemperature.classList.add("active");
  let temperature = document.querySelector("#currentTemp");
  temperature.innerHTML = `${Math.round(celciusTemp)}˚`;
}

function displayFarenheitTemperature(event) {
  event.preventDefault();
  celciusTemperature.classList.remove("active");
  farenheitTemperature.classList.add("active");
  let temperature = document.querySelector("#currentTemp");
  temperature.innerHTML = `${Math.round(farenheitTemp)}˚`;
}

let farenheitTemp = null;

let currentLocationWeather = document.querySelector(".current-location-button");
currentLocationWeather.addEventListener("click", displayCurrentLocationWeather);

let celciusTemperature = document.querySelector("#celcius");
celciusTemperature.addEventListener("click", displayCelciusTemperature);

let farenheitTemperature = document.querySelector("#farenheit");
farenheitTemperature.addEventListener("click", displayFarenheitTemperature);

showDefault("Chicago");
