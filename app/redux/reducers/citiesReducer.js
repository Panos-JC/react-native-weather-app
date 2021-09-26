import { ADD_CITY, REFRESH_CITIES, REMOVE_CITY } from "../constants";

/**
 * City Object:
 * {
 *    id
 *    name
 *    country
 *    weather
 *    temperature
 *    icon
 *    lon
 *    lat
 * }
 */

const initialState = {
  cities: [], // array of city objects
};
const citiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CITY:
      return {
        ...state,
        cities: [...state.cities, action.payload],
      };

    case REMOVE_CITY:
      return {
        ...state,
        cities: state.cities.filter(city => city.id !== action.payload),
      };

    case REFRESH_CITIES:
      return {
        ...state,
        cities: action.payload,
      };

    default:
      return state;
  }
};

export default citiesReducer;
