import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AppButton from "../homeScreen/button";
import productData from "../productData.json";
// let cheerio = require("cheerio");
// const axios = require("axios");

export default function BarcodeScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    var navigated = false;
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    console.log("THIS IS THE BARCODE", data);

    for (const category in productData) {
      for (const product in productData[category]) {
        var productInfo = productData[category][product];
        var productName = productData[category][product]["name"].toLowerCase();
        var barcode = productData[category][product]["UPC"];

        var barcodeFound = false;

        if (barcode == "6041004701") {
          console.log("IT WAS HERE!!");
          barcodeFound = barcode.toString().includes(data.toString());
          console.log(barcodeFound);
        }

        if (barcodeFound) {
          navigated = true;
          console.log("SHOULD NAVIGATE");
          navigation.navigate("ProductView", {
            productName: productInfo["name"],
            recyclable: productInfo["recyclable"],
            additionalInfo: productInfo["additionalInfo"],
          });
          return;
        }
      }
    }
    if (navigated) {
    } else {
      navigation.navigate("ProductView", {
        productName: "Not Found",
        recyclable: "F",
        additionalInfo: "",
      });
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.barcode}
      />
      {scanned && (
        <AppButton
          style={{
            height: 100,
          }}
          title={"Tap to Scan Again"}
          onPress={() => setScanned(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barcode: {
    flex: 1,
  },
});
