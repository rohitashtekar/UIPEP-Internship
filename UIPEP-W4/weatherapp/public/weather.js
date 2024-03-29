const KELVIN = 273.16;
const apikey = '4bdda8b6549bcd23b379d2636ca63117';

const loc = document.querySelector('.location');
const notif = document.querySelector('.notif');
const tempValue = document.querySelector('.temp-value');
const climate = document.querySelector('.climate-desc');
const icon = document.querySelector('.weather-icon');

const weather = {};

weather.temperature = {
    unit : "celsius"
}

if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else {
    notif.innerHTML = "Browser does not support Geolocation"
}

function setPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    getWeather(lat, long);
}

function showError(error) {
    notif.innerHTML = `<p>${error.message}</p>`;
}

function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
    // console.log(api)
    fetch(api)
    .then( response => {
        let data = response.json();
        return data;
    })
    .then( (data) => {
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.iconId = data.weather[0].icon;
        weather.description = data.weather[0].description;
        weather.city = data.name;
        weather.country = data.sys.country;
    }).then( () => {
        displayWeather();
    });
};

function displayWeather() {
    tempValue.innerHTML = `${weather.temperature.value}&#176C`;
    icon.innerHTML = `<img src="icons/${weather.iconId}.svg">`
    climate.innerHTML = `${weather.description.toUpperCase()}`;
    loc.innerHTML = `${weather.city.toUpperCase()}, ${weather.country.toUpperCase()}`
}

function celToFar(temperature) {
    return (temperature * 9/5) + 32;
}

tempValue.addEventListener('click', () => {
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit === 'celsius') {
        let fahrenheit = celToFar(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempValue.innerHTML = `${fahrenheit}&#176F`;
        weather.temperature.unit = 'fahrenheit';
    }
    else {
        tempValue.innerHTML = `${weather.temperature.value}&#176C`;
        weather.temperature.unit = 'celsius';
    }
})
