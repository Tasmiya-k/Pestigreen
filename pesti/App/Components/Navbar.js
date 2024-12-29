import React from "react";
import { View, Text, Image, Button } from "react-native";
import leftL from "./../../assets/Pesti 2.png";
import rightL from "./../../assets/Pesti 3.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";

const Navbar = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    checkLoggedInStatus();
  }, []);

  const checkLoggedInStatus = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    setIsLoggedIn(userToken !== null);
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("usertoken");
      setIsLoggedIn(false);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error signing out:", error);
      Alert.alert("Error", "An error occurred while signing out.");
    }
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#fff",
      }}
    >
      <Image source={rightL} />
      <Image source={leftL} />
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

export default Navbar;
