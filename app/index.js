let today = new Date();
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

function loadData(city) {
  let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  // let apiKey = "7a61f64o797dc034b4acb4tb4adb6e7e";
  // let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(locationStats);
}

loadData("London");
