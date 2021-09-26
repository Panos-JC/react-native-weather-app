import React from "react";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import Navigation from "./app/Navigation";
import configureStore from "./app/redux/configureStore";

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Navigation />
          <StatusBar style="light" />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
