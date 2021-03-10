import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppButton from "./button";
import SearchBar from "../searchBar/searchBar";
export default function HomeScreen({ navigation }) {
  const pressOCRButton = () => {
    navigation.push("OCR");
  };
  const pressBarcodeButton = () => {
    navigation.push("Barcode");
  };
  return (
    <View style={styles.container}>
      <SearchBar
        style={{
          width: 200,
        }}
      />
      <View style={styles.spacing}></View>

      <View style={styles.spacing}></View>

      <AppButton
        style={styles.button}
        onPress={pressBarcodeButton}
        title="Barcode"
      />
      <View style={styles.spacing}></View>
      <AppButton style={styles.button} onPress={pressOCRButton} title="OCR" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,

    display: "flex",
    flexDirection: "column",
  },
  button: {
    padding: 20,
  },
  spacing: {
    height: 15,
    width: 15,
  },
});
