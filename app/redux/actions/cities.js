import { ADD_CITY, REFRESH_CITIES, REMOVE_CITY } from "../constants";

export const addCity = city => {
  return {
    type: ADD_CITY,
    payload: city,
  };
};

export const removeCity = cityId => {
  return {
    type: REMOVE_CITY,
    payload: cityId,
  };
};

export const refreshCities = cities => {
  return {
    type: REFRESH_CITIES,
    payload: cities,
  };
};
