import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Platform,
} from "react-native";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppButton from "../homeScreen/button";

export default function ProductView({ route, navigation }) {
  console.log(navigation.state.params);
  const productName = navigation.state.params.productName;
  const additionalInfo = navigation.state.params.additionalInfo;

  var image = require("../../assets/images/garbagelogo.jpeg");
  var recyclable = false;

  if (navigation.state.params.recyclable == "T") {
    image = require("../../assets/images/recyclelogo2.png");
    var recyclable = true;
  }

  const pressHomeButton = () => {
    navigation.goBack();
  };

  const productStyles = () => {
    if (Platform.OS == "android") {
      return {
        fontFamily: "monospace",
        fontWeight: "bold",
        fontSize: 36,
      };
    }
    return {
      fontFamily: "Helvetica",
      fontWeight: "bold",
      fontSize: 36,
    };
  };

  const recycleStyles = () => {
    if (Platform.OS == "android") {
      return {
        fontFamily: "normal",
        fontWeight: "bold",
        fontSize: 26,
        textAlign: "center",
      };
    }
    return {
      fontFamily: "Arial",
      fontWeight: "bold",
      fontSize: 26,
      textAlign: "center",
    };
  };

  const infoStyles = () => {
    if (Platform.OS == "android") {
      return {
        fontFamily: "normal",
        fontSize: 15,
      };
    }
    return {
      fontFamily: "Arial",
      fontSize: 15,
    };
  };

  return (
    <View style={styles.container}>
      <Text style={productStyles()}>{productName}</Text>
      <View style={styles.spacing}></View>
      <Image
        fadeDuration={500}
        source={image}
        style={{ height: 200, width: 200 }}
      />
      <View style={styles.spacing}></View>

      <View style={styles.spacing}></View>
      <View style={styles.spacing}></View>
      <Text style={infoStyles()}>{additionalInfo}</Text>
      <View style={styles.spacing}></View>
      <View style={styles.spacing}></View>
      <AppButton
        style={styles.button}
        onPress={pressHomeButton}
        title="Check another item" // or just "Done"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#EEEEEE",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 20,
  },
  spacing: {
    height: 20,
    width: 20,
  },
});
