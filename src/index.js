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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2 daily-forecast">
            <h5>${formatDay(forecastDay.dt)}</h5>
            <p>H:${Math.round(forecastDay.temp.max)}˚ L:${Math.round(
          forecastDay.temp.min
        )}˚</p>
           <div> <img src="http://openweathermap.org/img/wn/${
             forecastDay.weather[0].icon
           }@2x.png" alt="" width=50px/> </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let currentTemperature = Math.round(response.data.main.temp);
  document.querySelector("#currentTemp").innerHTML = `${currentTemperature}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}`;
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.weather[0].description}`;
  document.querySelector("#currentHigh").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}˚`;
  document.querySelector("#currentLow").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}˚`;
  let weatherIcon = document.querySelector("#current-weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
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

let currentLocationWeather = document.querySelector(".current-location-button");
currentLocationWeather.addEventListener("click", displayCurrentLocationWeather);

showDefault("Chicago");
