import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

const api = {
  key: "aa588a7549ff40a43e7e3c2b04543718",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);

  /*
    Search button is pressed. Make a fetch call to the Open Weather Map API.
  */
  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* HEADER */}

      {/* Search Box - Input + Button */}
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "gray",
            padding: 8,
            borderRadius: 5,
            marginRight: 10,
            flex: 1,
          }}
          placeholder="Enter city/town..."
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
        <Button title="Search" onPress={searchPressed} />
      </View>

      {/* Display Weather Information */}
      {weather && weather.main && (
        <View>
          {/* Location */}
          <Text>{weather.name}</Text>

          {/* Temperature Celsius */}
          <Text>{weather.main.temp}°C</Text>

          {/* Condition (Sunny) */}
          <Text>{weather.weather[0].main}</Text>
          <Text>({weather.weather[0].description})</Text>
        </View>
      )}
    </View>
  );
};

export default Weather;
