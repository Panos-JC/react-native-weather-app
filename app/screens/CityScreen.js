import React, { useEffect, useState, useLayoutEffect } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { Avatar, Subheading, Title, Appbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { fetchCityWeatherById, fetchCityForecast } from "../api/api";
import ForecastList from "../components/ForecastList";
import colors from "../theme/colors";
import { getFormatedDate, getIconUri } from "../utils/utils";
import { removeCity } from "../redux/actions/cities";

function CityScreen({ route, navigation }) {
  const dispatch = useDispatch();

  const { cityId } = route.params;

  // Retrieve the current city from store
  const [city] = useSelector(state =>
    state.cities.cities.filter(item => item.id === cityId)
  );

  // current weather state
  const [currentWeather, setCurrentWeather] = useState({
    name: "",
    country: "",
    weather: "",
    temperature: "",
    wind: "",
    humidity: "",
    dt: "",
    icon: "",
  });
  // forecast state
  const [forecastData, setForecastData] = useState([]);

  // Add delete button on header
  useLayoutEffect(() => {
    navigation.setOptions({
      button: <Appbar.Action icon="delete" onPress={handleDelete} />,
    });
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch current city's weather data
        const { data: weatherData } = await fetchCityWeatherById(cityId);

        setCurrentWeather({
          name: weatherData.name,
          country: weatherData.country,
          weather: weatherData.weather[0].main,
          temperature: weatherData.main.temp,
          wind: weatherData.wind.speed,
          humidity: weatherData.main.humidity,
          dt: weatherData.dt,
          icon: weatherData.weather[0].icon,
        });

        // fetch current city's weather forecast
        const { data: dailyForcastData } = await fetchCityForecast(
          city.lon,
          city.lat
        );

        // store data only for the next 4 days
        setForecastData(dailyForcastData.daily.slice(1, 5));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [cityId]);

  // dispatch the removeCity action and go back to the home screen
  const handleDelete = () => {
    dispatch(removeCity(cityId));
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>{currentWeather.name}</Title>
      <Subheading style={styles.subtitle}>
        {`${getFormatedDate(currentWeather.dt)}, ${currentWeather.weather}`}
      </Subheading>

      <View style={[styles.temperatureContainer, styles.row]}>
        <Text style={styles.temperature}>
          {Math.round(currentWeather.temperature)} ℃
        </Text>
        <Image
          style={styles.weatherIcon}
          source={{ uri: getIconUri(currentWeather.icon) }}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.row}>
          <Avatar.Icon style={styles.statIcons} size={60} icon="send" />
          <Text style={styles.statText}>{currentWeather.wind}km/h</Text>
        </View>
        <View style={styles.row}>
          <Avatar.Icon
            style={styles.statIcons}
            size={60}
            icon="water-percent"
          />
          <Text style={styles.statText}>{currentWeather.humidity}%</Text>
        </View>
      </View>

      <ForecastList data={forecastData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    color: colors.primaryText,
  },
  subtitle: {
    fontSize: 17,
    color: colors.secondaryText,
  },
  temperatureContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  temperature: {
    fontSize: 60,
    color: colors.secondaryText,
    marginRight: 40,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  statIcons: {
    backgroundColor: "white",
    marginRight: 20,
  },
  statText: {
    fontSize: 17,
    color: colors.secondaryText,
    marginRight: 20,
  },
});

export default CityScreen;
