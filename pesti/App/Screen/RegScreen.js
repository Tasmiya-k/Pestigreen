import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Text,
  Alert,
  TouchableOpacity,
  Animated,
} from "react-native";
import logo from "./../../assets/logo.png";
import { useFonts } from "expo-font";

const RegScreen = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const [fontLoaded] = useFonts({
    poppins: require("./../../assets/fonts/Poppins-Regular.ttf"),
  });
  const [logoScale] = useState(new Animated.Value(0));
  useEffect(() => {
    // Animate the logo scale when the component mounts
    Animated.timing(logoScale, {
      toValue: 1, // Scale to 100% of the original size
      duration: 1000, // Animation duration in milliseconds
      useNativeDriver: true, // Enable native driver for performance
    }).start(); // Start the animation
  }, []);
  const handleSignIn = () => {
    navigation.navigate("Login");
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "http://192.168.56.1:1337/userapi/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            email,
            password,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "ok") {
        navigation.navigate("Login");
      } else {
        // Display error message using Alert
        Alert.alert("Error", data.message); // Assuming the error message is in data.message
        console.log(data);
      }
    } catch (error) {
      // Handle network or server errors
      console.error("Error during registration:", error);
      // Optionally display a generic error message to the user
      Alert.alert("Error", "An error occurred during registration.");
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
        placeholder="Full Name"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Button
        title="Register"
        style={styles.Button}
        className="regbutton"
        onPress={handleRegister}
        color="#5EBB46"
      />
      <Text style={styles.otherText}>Already have an account? </Text>
      <TouchableOpacity onPress={handleSignIn}>
        <Text style={styles.signInText}>Sign in</Text>
      </TouchableOpacity>
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
  },
  signInText: {
    textDecorationLine: "underline",
    color: "#007bff", // You can change the color to match your app's theme
  },
});

export default RegScreen;
