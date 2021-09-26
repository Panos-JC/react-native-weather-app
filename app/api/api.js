import axios from "axios";

const API_KEY = "0d661f5bff82854060dcfd83661520e5";

axios.defaults.baseURL = "https://api.openweathermap.org/data/2.5/";

/**
 * Provided a city name, fetch the city's current weather
 *
 * @param {string} city The name of the city
 * @returns {Promise} The axios response
 */
export const fetchCityWeather = city => {
  const URL = `weather?q=${city}&units=metric&appid=${API_KEY}`;
  return axios.get(URL);
};

/**
 * Provided a city id, fetch the city's current weather
 *
 * @param {string} cityId
 * @returns {Promise} The axios response
 */
export const fetchCityWeatherById = cityId => {
  const URL = `weather?id=${cityId}&units=metric&appid=${API_KEY}`;
  return axios.get(URL);
};

/**
 * Provided city's coordinates, get all essential weather data
 *
 * @param {number} lon Longtitude
 * @param {number} lat Latitude
 * @returns {Promise} The axios response
 */
export const fetchCityForecast = (lon, lat) => {
  const URL = `onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  return axios.get(URL);
};
