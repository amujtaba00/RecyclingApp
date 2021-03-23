import { View, Button, StyleSheet, TouchableOpacity, Text, Image, Platform, Alert } from "react-native";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppButton from "../homeScreen/button";

export default function ProductView({ navigation }) {
    const pressHomeButton = () => {
        navigation.push("Home");
    };
    const showExtraItems = () => {
        Alert.alert("Items", String(navigation.getParam("name")))
    };
    const showExtraInfo = () => {
        Alert.alert("Info", String(navigation.getParam("info")))
    };

    const productStyles = () => {
        if (Platform.OS == "android") {
            return {
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: 36
            }
        }
        return {
            fontFamily: "Helvetica",
            fontWeight: "bold",
            fontSize: 36
        }
    }

    const recycleStyles = () => {
        if (Platform.OS == "android") {
            return {
                fontFamily: "normal",
                fontWeight: "bold",
                fontSize: 26
            }
        }
        return {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: 26
        }
    }

    const infoStyles = () => {
        if (Platform.OS == "android") {
            return {
                fontFamily: "normal",
                fontSize: 15
            }
        }
        return {
            fontFamily: "Arial",
            fontSize: 15
        }
    }

    return (
        <View style={styles.container}>
            <Text
                style={productStyles()}
                numberOfLines={2}
                onPress={showExtraItems}
            >
                {navigation.getParam("name").toUpperCase()}
            </Text>
            <View style={styles.spacing}></View>
            <Image
                fadeDuration={500}
                source={{
                    width: 200,
                    height: 400,
                    uri: "https://picsum.photos/200/400"
                }}
            />

            <View style={styles.spacing}></View>
            {/* <Text style={recycleStyles()}>Is Not Recyclable</Text>
            <View style={styles.spacing}></View>
            <View style={styles.spacing}></View> */}
            <Text
                style={infoStyles()}
                numberOfLines={6}
                onPress={showExtraInfo}
            >
                Info: {navigation.getParam("info")}
            </Text>

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

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    padding: 20,
  },
  spacing: {
    height: 20,
    width: 20,
  },
});
