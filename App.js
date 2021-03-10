import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import Camera from "./components/camera/camera";
import BarcodeScanner from "./components/camera/barcode";
import HomeScreen from "./components/homeScreen/homeScreen";
import MyView from "./components/customViewObject/myView";
import Navigator from "./routes/homeStack";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
    };
  }

  render() {
    return (
      <SafeAreaProvider style={styles.container}>
        <Navigator />
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
    backgroundColor: "#fff",
  },
});
