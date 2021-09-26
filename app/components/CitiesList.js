import React from "react";
import { StyleSheet, Text, Image } from "react-native";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { getIconUri } from "../utils/utils";

function CitiesList({ cities }) {
  const navigation = useNavigation();

  return (
    <List.Section>
      <List.Subheader>Cities</List.Subheader>
      {cities.map(city => (
        <List.Item
          key={city.id}
          title={`${city.name}, ${city.country}`}
          description={city.weather}
          onPress={() => navigation.navigate("City", { cityId: city.id })}
          left={() => (
            <Image
              style={{ width: 60, height: 60 }}
              source={{ uri: getIconUri(city.icon) }}
            />
          )}
          right={() => (
            <Text style={styles.listItemRight}>{city.temperature} ℃</Text>
          )}
        />
      ))}
    </List.Section>
  );
}

const styles = StyleSheet.create({
  listItemRight: {
    fontSize: 20,
    textAlignVertical: "center",
    paddingRight: 10,
  },
});

export default CitiesList;
