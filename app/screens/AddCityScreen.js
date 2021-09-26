import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Appbar, Snackbar } from "react-native-paper";
import { useDispatch } from "react-redux";

import { fetchCityWeather } from "../api/api";
import { addCity } from "../redux/actions/cities";

function AddCityScreen({ navigation }) {
  const dispatch = useDispatch();

  // TextInput state
  const [city, setCity] = useState("");

  // Snackbar state
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Add check button on header
  useLayoutEffect(() => {
    navigation.setOptions({
      button: <Appbar.Action icon="check" onPress={handlePress} />,
    });
  }, [navigation, city]);

  /**
   * Adds new city in store and return to home screen
   */
  const handlePress = async () => {
    try {
      // fetch city's current weather
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
      navigation.goBack();
    } catch (error) {
      // Handle error
      setErrorMessage(error.response.data.message);
      setVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="City"
        placeholder="e.g. New York"
        value={city}
        onChangeText={city => setCity(city)}
      />

      <Snackbar
        style={styles.snackbar}
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: "Dismiss",
          onPress: () => setVisible(false),
        }}
      >
        {errorMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  snackbar: {
    width: "100%",
    left: 0,
  },
});

export default AddCityScreen;
