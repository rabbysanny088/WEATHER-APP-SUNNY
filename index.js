const searchBox = document.querySelector(".search input");

const searchBtn = document.querySelector(".search button");

const weatherIcont = document.querySelector(".weather-icon");

const loading = document.querySelector("#loading");

const apiKey = "a757093b09fff2d5e7c1b0b48cf9dbfe";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

searchBox.addEventListener("input", () => {
  document.querySelector(".error").style.display = "none";
});
async function checkWeather(city) {
  try {
    if (!city) {
      console.log(!city)
      showAlert("Please enter a city name.");
    } else {
      loading.style.display = "block";
      const response = await axios.get(apiUrl + city + `&appid=${apiKey}`);

      const data = response.data;
      console.log(data);
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.floor(data.main.temp) + "°c";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

      switch (data.weather[0].main) {
        case "Clouds":
          weatherIcont.src = "./images/clouds.png";
          break;
        case "Clear":
          weatherIcont.src = "./images/clear.png";
          break;
        case "Rain":
          weatherIcont.src = "./images/rain.png";
          break;
        case "Drizzle":
          weatherIcont.src = "./images/drizzle.png";
          break;
        case "Mist":
          weatherIcont.src = "./images/mist.png";
          break;
        case "Snow":
          weatherIcont.src = "./images/snow.png";
          break;
        default:
          break;
      }
      document.querySelector(".weather").style.display = "block";
  
      document.querySelector(".error").style.display = "none";
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      showAlert(error.message);
    }
  } finally {
    loading.style.display = "none"; // Hide loading spinner after handling the request
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
  searchBox.value = "";
});

function showAlert(errorMes) {
  const alert = document.createElement("div");
  alert.classList.add("alert", "alert-danger");
  alert.textContent = errorMes;
  alertContainer.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 4000);
}
