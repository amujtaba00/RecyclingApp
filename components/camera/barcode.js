import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AppButton from "../homeScreen/button";
let cheerio = require("cheerio");
const axios = require("axios");

export default function BarcodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    // console.log("Smt");

    // var url = `https://www.walmart.ca/search?q=${data
    //   .toString()
    //   .substring(2)
    //   .slice(0, -1)}&c=10019`;

    // axios.get(url).then((response) => {
    //   console.log(response.data);
    // });
    // let $ = cheerio.load(url);

    // console.log($.text());

    // $(".css-vh2dix e1m8uw911").each(function (index, element) {
    //   console.log(index, element);
    // });
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
