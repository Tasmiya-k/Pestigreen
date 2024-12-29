import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Text,
  Animated,
} from "react-native";
import React, { useState, useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import logo from "./../../assets/logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const [logoScale] = useState(new Animated.Value(0));
  useEffect(() => {
    // Animate the logo scale when the component mounts
    Animated.timing(logoScale, {
      toValue: 1, // Scale to 100% of the original size
      duration: 1000, // Animation duration in milliseconds
      useNativeDriver: true, // Enable native driver for performance
    }).start(); // Start the animation
  }, []);
  const Loginuser = async () => {
    try {
      const response = await fetch("http://192.168.169.107:1337/userapi/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.user) {
        await AsyncStorage.setItem("usertoken", JSON.stringify(true));
        alert("Login is successful");
        navigation.navigate("Home"); // Replace "Home" with the name of your home screen
      } else {
        alert("Please check your credentials");
      }

      console.log(data);
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: logoScale }] }}>
        <Image
          source={logo}
          style={{
            marginBottom: 5,
            width: 120,
            alignSelf: "center",
            height: 80,
          }}
        />
      </Animated.View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        title="Login"
        style={styles.Button}
        className="regbutton"
        onPress={Loginuser}
        color="#5EBB46"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontFamily: "poppins",
  },
  Button: {
    backgroundColor: "#5EBB46",
    fontFamily: "poppins",
    color: "#5EBB46",
    width: 30,
  },
});

export default LoginScreen;
