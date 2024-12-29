import React from "react";
import { View, Text, Image, useNavigation } from "react-native";
import SearchBar from "../Components/Searchbar";
import service1 from "./../../assets/service_1.png";
import service2 from "./../../assets/img_serv.png";
import service3 from "./../../assets/service_2.png";

const Services = () => {
  return (
    <View>
      <Text>Services</Text>
      <SearchBar />
      <Image style={{margin:20}} source={service1} />
      <Image style={{margin:20}}  source={service2} />
      <Image style={{margin:20}} source={service3} />
    </View>
  );
};

export default Services;
