import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useState } from "react-native";
import LoginScreen from "./App/Screen/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegScreen from "./App/Screen/RegScreen";
import Home from "./App/Screen/Home";
import Profile from "./App/Screen/Profile";
import Services from "./App/Screen/Services";
import Community from "./App/Screen/Community";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Weather from "./App/Components/Weather";
import React from "react";
import AskHere from "./App/Screen/Askhere";
import Crop from "./App/Screen/Crop"
import Cropscreen from "./App/Screen/Cropscreen"

const Stack = createStackNavigator();
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(checkLoggedInStatus);

  React.useEffect(() => {
    checkLoggedInStatus();
  }, [isLoggedIn]);

  const checkLoggedInStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem("usertoken");
      console.log(userToken);
      if (userToken) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"-"}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Service" component={Services} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Community" component={Community} />
        <Stack.Screen name="Weather" component={Weather} />

        <Stack.Screen name="-" component={RegScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AskHere" component={AskHere} />
        <Stack.Screen name="Crop" component={Crop} />
        <Stack.Screen name="CropS" component={Cropscreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
