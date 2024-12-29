import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import home from "./../../assets/home.png";
import services from "./../../assets/services.png";
import profile from "./../../assets/profile.png";
import community from "./../../assets/community.png";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={home} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Service')}>
        <Image source={services} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Community')}>
        <Image source={community} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image source={profile} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 7,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  icon: {
    width: 35,
    height: 35,
  },
});

export default Footer;
