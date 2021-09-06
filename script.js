// SELECT ELEMENTS
const iconElement = document.getElementById("weather-icon");
const tempElement = document.getElementById("temperature-value");
const descElement = document.getElementById("temperature-description");
const detailElement = document.getElementById("temperature-details");
const locationElement = document.getElementById("location");
const notificationElement = document.getElementById("notification");
const inputField = document.getElementById('input-field');
const button = document.getElementById('button');

// APP DATA
const weather = {};

weather.temperature = {
    unit: "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const API_KEY = "dc0da68049a9c5f1a810751785c9000d";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser Doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
// API KEY : dc0da68049a9c5f1a810751785c9000d

function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            getWeatherInfo(data);
        })
}

const getWeatherInfo = data => {
    iconId = data.weather[0].icon;
    temperatureValue = Math.floor(data.main.temp - KELVIN);
    tempDesc = data.weather[0].description;
    tempDetail = data.main.humidity;
    windSpeed = Math.floor(data.wind.speed * 3);
    weatherOfCity = data.name;
    weatherOfCountry = data.sys.country;
    displayWeather();
}


// DISPLAY WEATHER TO UI
function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${iconId}.png"/>`;
    tempElement.innerHTML = `${temperatureValue}°<span>C</span>`;
    descElement.innerHTML = tempDesc;
    detailElement.innerHTML = `Humidity: ${tempDetail} % </br> Wind: ${windSpeed} km/h`;
    locationElement.innerHTML = `${weatherOfCity}, ${weatherOfCountry}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function () {
    if (temperatureValue === undefined) return;

    if (weather.temperature.unit == "celsius") {
        let fahrenheit = celsiusToFahrenheit(temperatureValue);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else {
        tempElement.innerHTML = `${temperatureValue}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});


// 

// IF USER SELECTED POSITION

// 
button.addEventListener('click', () => {
    inputValue = inputField.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => getWeatherInfo(data))
        inputField.value = "";
});

