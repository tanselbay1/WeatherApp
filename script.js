// const weatherKey = config.MY_WEATHER_API;
// const giphyKey = config.GIPHY_API;

const config = {
  weatherKey: "94770043fca80e8cc3132e2079b76fe1",
  giphyKey: "S47IAaHXYcx0t0492hrzZOKubaW5QkwR",
};

async function getWeather(location, units) {
  try {
    // For Celcius use 'metric' and for Fahrenheit, 'imperial'
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&APPID=${config.weatherKey}`,
      {
        mode: "cors",
      }
    );
    const data = await response.json();
    const iconCode = data.weather[0].icon;
    const iconEl = document.getElementById("weather-icon");
    iconEl.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconEl.style.display = "inline";
    const weatherLike = data.weather[0].main;
    const temp = data.main.temp;
    getGif(weatherLike);
    showWeatherMes(weatherLike, temp);
  } catch (err) {
    alert("Please enter a valid city name!");
  }
}

async function getGif(weatherCondition) {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=${config.giphyKey}&s=${weatherCondition}`
    );
    const data = await response.json();
    const imgUrl = await data.data.images.original.url;
    const showcase = document.getElementById("showcase");
    showcase.style.backgroundImage = `url(${imgUrl})`;
  } catch (err) {
    console.log(err);
  }
}

function showWeatherMes(weatherLike, temp) {
  const message = `The Weather App says, it's <u>${weatherLike}</u> and <u>${temp}</u> degree.`;
  const h3el = document.querySelector("h3");
  h3el.innerHTML = message;
}

const header = document.querySelector("h3");
const timeOfTheDay = ((el) => {
  const date = new Date();
  const time = date.getHours();
  switch (time) {
    case time >= 6 || time <= 11:
      el.innerText += " Morning";
      break;
    case time >= 12 || time <= 17:
      el.innerText += " Afternoon";
      break;
    case time >= 18 || time <= 22:
      el.innerText += " Evening";
      break;
    default:
      el.innerText += " Night";
      break;
  }
})(header);

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formEl = document.forms.weatherForm;
  const formData = new FormData(formEl);
  const locationData = formData.get("location");
  const unitsData = formData.get("units");
  getWeather(locationData, unitsData);
});
