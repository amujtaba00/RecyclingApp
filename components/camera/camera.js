import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { RNCamera } from "react-native-camera";
import { Camera } from "expo-camera";
import productData from "../productData.json";

var wuzzy = require("wuzzy");
export default function App({ navigation }) {
  const [startCamera, setStartCamera] = React.useState(true);

  const __takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync({ base64: true });
    console.log("Got here Styll!");

    var text = callToGoogleVisionAPI(photo["base64"]);

    console.log(text);
  };

  const callToGoogleVisionAPI = (base64) => {
    fetch(
      "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCCqFd-0Rwbo2BPk_KKR6EsUf-6D2ecygo",
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "text/plain",
          Connection: "keep-alive",
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64,
              },
              features: [
                {
                  type: "TEXT_DETECTION",
                  maxResults: 4,
                },
              ],
            },
          ],
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        var maxJaccardIndex = 0;
        var bestMatch = "";
        var bestMatches = [];

        const detectedText = data["responses"][0]["fullTextAnnotation"]["text"]
          .replace(/\n/g, " ")
          .toLowerCase();
        console.log(detectedText);
        for (const category in productData) {
          for (const product in productData[category]) {
            var productName = productData[category][product][
              "name"
            ].toLowerCase();
            var productInfo = productData[category][product];

            var jaccardIndex = 0;

            productNameWords = productName.split(" ");

            var unique = productNameWords.filter(
              (v, i, a) => a.indexOf(v) === i
            );

            for (var i = 0; i < unique.length; i++) {
              var word = unique[i];

              if (detectedText.includes(word)) {
                jaccardIndex += 1;
              }
            }

            jaccardIndex = jaccardIndex / unique.length;
            if (productInfo["barcode"] == "6000200900261") {
              console.log("WENT THRU!!!!!!!!!!!!!!!!!!!!", jaccardIndex);
            }

            if (jaccardIndex > maxJaccardIndex) {
              maxJaccardIndex = jaccardIndex;
              productInfo["jaccardIndex"] = jaccardIndex;
              bestMatch = productInfo;
              bestMatches = [bestMatch];
            }
            if (jaccardIndex === maxJaccardIndex) {
              productInfo["jaccardIndex"] = jaccardIndex;
              bestMatches.push(productInfo);
            }
          }
        }

        console.log("BEST MATCH:-- " + bestMatch + maxJaccardIndex);
        console.log(bestMatches);
        if (bestMatches.length > 0) {
          navigation.navigate("ProductView", {
            productName: bestMatches[0]["name"],
            recyclable: bestMatches[0]["recyclable"],
            additionalInfo: bestMatches[0]["additionalInfo"],
          });
        } else {
          navigation.navigate("ProductView", {
            productName: bestMatch["name"],
            recyclable: bestMatch["recyclable"],
            additionalInfo: bestMatch["additionalInfo"],
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === "granted") {
      setStartCamera(true);
      console.log(startCamera);
    } else {
      Alert.alert("Access denied");
    }
  };
  return (
    <View style={styles.container}>
      {startCamera && (
        <Camera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.container}
        >
          <View
            style={{
              position: "absolute",
              bottom: 0,
              flexDirection: "row",
              flex: 1,
              width: "100%",
              padding: 20,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                alignSelf: "center",
                flex: 1,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={__takePicture}
                style={{
                  width: 70,
                  height: 70,
                  bottom: 0,
                  borderRadius: 50,
                  backgroundColor: "#fff",
                }}
              />
            </View>
          </View>

          <Text> Flip </Text>
        </Camera>
      )}
      {startCamera === false && (
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: "#14274e",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 40,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Take picture
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  camera: {
    flex: 1,
  },
});
