const weatherKey = config.MY_WEATHER_API;
const giphyKey = config.GIPHY_API;

async function getWeather(location, units) {
  try {
    // For Celcius use 'metric' and for Fahrenheit, 'imperial'
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&APPID=${weatherKey}`
    );
    const data = await response.json();
    console.log(data.weather[0].main);
    console.log(data.main.temp);
  } catch (err) {
    console.log(err);
  }
}

async function getGif(weatherCondition) {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=${giphyKey}&s=${weatherCondition}`
    );
    const data = await response.json();
    const imgUrl = await data.data.images.original.url;
    const showcase = document.getElementById("showcase");
    showcase.style.backgroundImage = `url(${imgUrl})`;
    console.log(imgUrl);
  } catch (err) {
    console.log(err);
  }
}

getGif("summer");

// getWeather("Bangkok", "metric");

// function getUserInput(location, units) {
//    document
// }

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formEl = document.forms.weatherForm;
  const formData = new FormData(formEl);
  const locationData = formData.get("location");
  const unitsData = formData.get("units");
  getWeather(locationData, unitsData);
  console.log(locationData);
  console.log(unitsData);
});
