import { combineReducers, createStore } from "redux";

import citiesReducer from "./reducers/citiesReducer";

const rootReducer = combineReducers({
  cities: citiesReducer,
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
