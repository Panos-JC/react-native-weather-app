/**
 * Returns the openweathermap uri for a specific icon
 *
 * @param {string} icon The icon code provided by the openweathermap API
 * @returns {string} The full uri of the icon
 */
export const getIconUri = icon => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

/**
 * Retrieves the day from a unix timestamp in long or short format (e.g. Mon/Monday)
 *
 * @param {string} timestamp A unix timestamp
 * @param {boolean} long Weather or not the day returnd will be in long or short format (e.g. Mon/Monday). Defaults to false
 * @returns {string} The day
 */
export const getDay = (timestamp, long = false) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const date = new Date(timestamp * 1000);

  return long ? days[date.getDay()] : daysShort[date.getDay()];
};

/**
 * Formats a unix timestamp to day and time
 * Example: 1632587138 --> Sat, 19:25
 *
 * @param {string} timestamp A unix timestamp
 * @returns {string} The foramted date
 */
export const getFormatedDate = timestamp => {
  const date = new Date(timestamp * 1000);

  const day = getDay(timestamp);
  const hours = date.getHours();

  // if minutes are less than 10, add a zero in front
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return `${day}, ${hours}:${minutes}`;
};
