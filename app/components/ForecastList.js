import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { List } from "react-native-paper";

import colors from "../theme/colors";
import { getDay, getIconUri } from "../utils/utils";

function ForecastList({ data }) {
  return (
    <List.Section>
      {data.map((item, i) => (
        <List.Item
          key={i}
          titleStyle={styles.listItemTitle}
          title={getDay(item.dt, true)}
          right={() => (
            <View style={styles.listItemRight}>
              <Text style={styles.listItemRightText}>
                {`${item.weather[0].main}, ${Math.round(item.temp.day)} ℃`}
              </Text>
              <Image
                style={styles.weatherIcon}
                source={{ uri: getIconUri(item.weather[0].icon) }}
              />
            </View>
          )}
        />
      ))}
    </List.Section>
  );
}

const styles = StyleSheet.create({
  listItemTitle: {
    color: colors.primaryText,
    fontSize: 20,
  },
  listItemRight: { flexDirection: "row", alignItems: "center" },
  listItemRightText: {
    fontSize: 18,
    color: colors.secondaryText,
    marginRight: 20,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
});

export default ForecastList;
