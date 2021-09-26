import React from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import colors from "../theme/colors";

/**
 * A custom AppBar made with react-native-paper, and used throughout the whole app
 */
function CustomNavigationBar({ navigation, back, options }) {
  return (
    <Appbar.Header style={styles.appbar}>
      {/* Show thermometer icon only in homescreen */}
      {!back && <Appbar.Action icon="thermometer" />}

      {/* Show back icon only if there is another screen on the navigation stack beneath the current screen */}
      {back && <Appbar.BackAction onPress={navigation.goBack} />}

      <Appbar.Content title={options.title} />

      {/* Show plus icon only in homescreen */}
      {!back && (
        <Appbar.Action
          icon="plus"
          onPress={() => navigation.navigate("Add city")}
        />
      )}

      {/* Show a button passed through setOptios by different screens */}
      {options.button}
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: colors.primary,
    color: colors.white,
  },
});

export default CustomNavigationBar;
