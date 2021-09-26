import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import CustomNavigationBar from "./components/CustomNavigationBar";
import CityScreen from "./screens/CityScreen";
import AddCityScreen from "./screens/AddCityScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: props => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name="Home"
        options={{ title: "Weather forecast" }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="City"
        options={{ title: "5 day forecast" }}
        component={CityScreen}
      />
      <Stack.Screen
        name="Add city"
        options={{
          title: "Add new city",
        }}
        component={AddCityScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
