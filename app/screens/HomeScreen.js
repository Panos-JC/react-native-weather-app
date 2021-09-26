import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import CitiesList from "../components/CitiesList";
import { fetchCityWeather } from "../api/api";
import { addCity, refreshCities } from "../redux/actions/cities";

const initialCities = ["Athens", "London", "Los Angeles", "Reykjavik", "Tokyo"];

function HomeScreen() {
  const dispatch = useDispatch();

  const { cities } = useSelector(state => state.cities);

  const [refreshing, setRefreshing] = useState(false);

  // handle screen refresh
  const onRefresh = async () => {
    setRefreshing(true);

    const newCitiesDataPromise = cities.map(async city => {
      // fetch city's current weather
      const { data } = await fetchCityWeather(city.name);

      const cityData = {
        id: data.id,
        name: data.name,
        country: data.sys.country,
        weather: data.weather[0].main,
        temperature: Math.round(data.main.temp),
        icon: data.weather[0].icon,
        lon: data.coord.lon,
        lat: data.coord.lat,
      };

      return cityData;
    });

    const newCitiesData = await Promise.all(newCitiesDataPromise);

    dispatch(refreshCities(newCitiesData));

    setRefreshing(false);
  };

  useEffect(() => {
    try {
      // if there are no cities in store, fetch data for the initial cities and store them
      if (cities.length < 1) {
        initialCities.map(async city => {
          const { data } = await fetchCityWeather(city);

          const cityData = {
            id: data.id,
            name: data.name,
            country: data.sys.country,
            weather: data.weather[0].main,
            temperature: Math.round(data.main.temp),
            icon: data.weather[0].icon,
            lon: data.coord.lon,
            lat: data.coord.lat,
          };

          dispatch(addCity(cityData));
        });
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <CitiesList cities={cities} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
