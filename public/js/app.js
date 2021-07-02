window.onload = () => {
  getWeatherData("Delhi");
};

var error = document.getElementById("error-msg");
var p2 = document.getElementById("p2");
var form = document.querySelector("form");

async function getWeatherData(addr = "") {
  let address = document.getElementById("city_input").value || addr;
  try {
    const res = await fetch(`/weather?address=${address}`);
    const data = await res.json();
    data.error ? throwError("City is invalid") : displayData(data);
  } catch {
    throwError("Something went wrong");
  }
}

function displayData(data = {}) {
  const weatherInfo = document.getElementsByClassName("info");
  Array.from(weatherInfo).forEach((div) => {
    if (div.classList.contains("fade-in2")) {
      div.classList.remove("fade-in2");
      div.offsetWidth;
      div.classList.add("fade-in2");
    } else {
      div.classList.add("fade-in2");
    }
  });

  error.innerHTML = "";
  document.getElementById("location").innerHTML = data.request.query;
  document.getElementById("degrees").innerHTML = data.current.temperature;
  document.getElementById("condition").innerHTML =
    data.current.weather_descriptions[0];
  document.getElementById(
    "feels-like"
  ).innerHTML = `FEELS LIKE: ${data.current.feelslike}`;
  document.getElementById(
    "wind-mph"
  ).innerHTML = `WIND: ${data.current.wind_speed} MPH`;
  document.getElementById(
    "humidity"
  ).innerHTML = `HUMIDITY: ${data.current.humidity}`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherData();
});

function throwError(message) {
  error.innerHTML = message;
  error.style.display = "block";
  if (error.classList.contains("fade-in")) {
    error.style.display = "none";
    error.classList.remove("fade-in2");
    error.offsetWidth;
    error.classList.add("fade-in");
    error.style.display = "block";
  } else {
    error.classList.add("fade-in");
  }
}
