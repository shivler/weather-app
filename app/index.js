/*let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};
*/

// write your code here
/*let city = prompt("Enter a city").trim().toLowerCase();

if (weather[city]) {
  let celsiusTemperature = Math.round(weather[city].temp);
  let fahrenheitTemperature = Math.round(weather[city].temp * 1.8 + 32);
  let humidity = weather[city].humidity;

  alert(
    `It is currently ${celsiusTemperature}°C (${fahrenheitTemperature}°F) in ${city} with a humidity of ${humidity}%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}
*/
let today = new Date();
let hour = today.getHours();
let minute = today.getMinutes();

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
  axios.get(apiUrl).then(locationTemp);
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
  axios.get(apiUrl).then(locationTemp);
}

function locationTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let inputLocation = document.querySelector("#temperature");
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = `${response.data.name}`;
  inputLocation.innerHTML = `${temperature}`;
  celsiusTemperature = response.data.main.temp;
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
  axios.get(apiUrl).then(locationTemp);
}

loadData("London");
