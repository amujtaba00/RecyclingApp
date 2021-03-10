import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { RNCamera } from "react-native-camera";
import { Camera } from "expo-camera";

export default function App() {
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
      "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDU2DbNSV7o1NHQ78jnCGK0PtVeETdy8hM",
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
                  maxResults: 10,
                },
              ],
            },
          ],
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data["responses"][0]["fullTextAnnotation"]["text"]);
        console.log("hello");
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
