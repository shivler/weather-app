function formatDate(timestamp) {
  let today = new Date(timestamp);
  let hour = today.getHours();
  let minute = today.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[today.getDay()];
  let dayTime = document.querySelector("#date");
  dayTime.innerHTML = `${day} ${hour}:${minute}`;
}

function showDay(timestamp) {
  let today = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[today.getDay()];

  let tomorrow = document.querySelector("#tomorrowTitle");
  let secondDay = document.querySelector("#twoDayTitle");
  let thirdDay = document.querySelector("#threeDayTitle");
  let fourthDay = document.querySelector("#fourDayTitle");
  let fifthDay = document.querySelector("#fiveDayTitle");
  tomorrow.innerHTML = `${day}`;
}

function displayForecast(response) {
  let tomorrowHeading = document.querySelector("#tomorrowTitle");
  let secondHeading = document.querySelector("#twoDayTitle");
  let thirdHeading = document.querySelector("#threeDayTitle");
  let fourthHeading = document.querySelector("#fourDayTitle");
  let fifthHeading = document.querySelector("#fiveDayTitle");

  let tomorrowIcon = document.querySelector("#tomorrowImage");
  let twoDayIcon = document.querySelector("#twoDayImage");
  let threeDayIcon = document.querySelector("#threeDayImage");
  let fourDayIcon = document.querySelector("#fourDayImage");
  let fiveDayIcon = document.querySelector("#fiveDayImage");

  let tomorrowMax = document.querySelector("#dayOneMax");
  let tomorrowMin = document.querySelector("#dayOneMin");
  let twoDaysMax = document.querySelector("#dayTwoMax");
  let twoDaysMin = document.querySelector("#dayTwoMin");
  let threeDaysMax = document.querySelector("#dayThreeMax");
  let threeDaysMin = document.querySelector("#dayThreeMin");
  let fourDaysMax = document.querySelector("#dayFourMax");
  let fourDaysMin = document.querySelector("#dayFourMin");
  let fiveDaysMax = document.querySelector("#dayFiveMax");
  let fiveDaysMin = document.querySelector("#dayFiveMin");

  tomorrowHeading.innerHTML = showDay(response.data.list[0].dt * 1000);
  secondHeading = showDay(response.data.list[1].dt * 1000);
  thirdHeading = showDay(response.data.list[2].dt * 1000);
  fourthHeading = showDay(response.data.list[3].dt * 1000);
  fifthHeading = showDay(response.data.list[4].dt * 1000);

  tomorrowIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`
  );
  twoDayIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[1].weather[0].icon}@2x.png`
  );
  threeDayIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[2].weather[0].icon}@2x.png`
  );
  fourDayIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[3].weather[0].icon}@2x.png`
  );
  fiveDayIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.list[4].weather[0].icon}@2x.png`
  );

  tomorrowMax.innerHTML = Math.round(response.data.list[0].main.temp_max) + "°";
  tomorrowMin.innerHTML = Math.round(response.data.list[0].main.temp_min) + "°";
  twoDaysMax.innerHTML = Math.round(response.data.list[1].main.temp_max) + "°";
  twoDaysMin.innerHTML = Math.round(response.data.list[1].main.temp_min) + "°";
  threeDaysMax.innerHTML =
    Math.round(response.data.list[2].main.temp_max) + "°";
  threeDaysMin.innerHTML =
    Math.round(response.data.list[2].main.temp_min) + "°";
  fourDaysMax.innerHTML = Math.round(response.data.list[3].main.temp_max) + "°";
  fourDaysMin.innerHTML = Math.round(response.data.list[3].main.temp_min) + "°";
  fiveDaysMax.innerHTML = Math.round(response.data.list[4].main.temp_max) + "°";
  fiveDaysMin.innerHTML = Math.round(response.data.list[4].main.temp_min) + "°";
}

function cityName(city) {
  city.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let inputCity = document.querySelector("#city-input");
  city.innerHTML = `${inputCity.value}`;
  let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&appid=${apiKey}&units=metric`;
  // let apiKey = "7a61f64o797dc034b4acb4tb4adb6e7e";
  // let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city.innerHTML}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(locationStats);
}

let cityForm = document.querySelector("#citySearch");
cityForm.addEventListener("submit", cityName);

function currentLocation(position) {
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  // let longitude = position.coordinates.longitude;
  // let latitude = position.coordinates.latitude;
  // let apiKey = "7a61f64o797dc034b4acb4tb4adb6e7e";
  // let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(locationStats);
}

function locationStats(response) {
  let temperature = Math.round(response.data.main.temp);
  // let temperature = Math.round(response.data.temperature.current);
  let inputLocation = document.querySelector("#temperature");
  let currentCity = document.querySelector("#city");
  let windSpeedRound = Math.round(response.data.wind.speed * 3.6);
  let windSpeed = document.querySelector("#speed");
  let weatherDescription = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  currentCity.innerHTML = `${response.data.name}`;
  // currentCity.innerHTML = `${response.data.city}`;
  inputLocation.innerHTML = `${temperature}`;
  windSpeed.innerHTML = `Wind: ${windSpeedRound} km/h`;
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;
  celsiusTemperature = `${response.data.main.temp}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  // weatherDescription.innerHTML = `${response.data.condition.description}`;
  // celsiusTemperature = `${response.data.temperature.current}`;
  // iconElement.setAttribute("src", `${response.data.condition.icon_url}`);
  formatDate(response.data.dt * 1000);
  getForecast(response.data.coord);
}

function currentLocationBtn(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let userLocation = document.querySelector("#current");
userLocation.addEventListener("click", currentLocationBtn);

function celsiusUnit(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusElement = document.querySelector("#temperature");
  celsiusElement.innerHTML = Math.round(celsiusTemperature);
}

function fahrenheitUnit(event) {
  event.preventDefault();
  let fahrenheitTemperature = celsiusTemperature * 1.8 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitElement = document.querySelector("#temperature");
  fahrenheitElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
let fahrenheitLink = document.querySelector("#fahrenheit-link");
celsiusLink.addEventListener("click", celsiusUnit);
fahrenheitLink.addEventListener("click", fahrenheitUnit);
let celsiusTemperature = null;

function getForecast(coordinates) {
  let longitude = coordinates.lon;
  let latitude = coordinates.lat;
  let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function loadData(city) {
  let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  // let apiKey = "7a61f64o797dc034b4acb4tb4adb6e7e";
  // let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(locationStats);
}

loadData("London");
